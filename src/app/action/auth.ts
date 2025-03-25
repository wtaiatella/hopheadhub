'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import * as crypto from 'crypto'
import { Prisma } from '@prisma/client'
import { setAuthCookie, deleteAuthCookie, getTokenFromCookies } from '@/lib/auth-utils'
import { RegisterUserInput, LoginUserInput } from '@/types/register'

/**
 * Register a new user with email and password
 */
export async function registerUser(data: RegisterUserInput) {
   try {
      // Check if email already exists
      const existingEmail = await prisma.email.findUnique({
         where: { email: data.email },
      })

      if (existingEmail) {
         return { success: false, error: 'Email already registered' }
      }

      // Generate salt and hash password
      const salt = crypto.randomBytes(16).toString('hex')
      const hashedPassword = hashPassword(data.password, salt)

      // Create user and email in a transaction
      const user = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
         // Create the user with hashed password
         const newUser = await tx.user.create({
            data: {
               name: data.name,
               nickname: data.nickname,
               beerInterests: data.beerInterests || [],
               hashedPassword,
               salt,
            },
         })

         // Create the main email for this user
         await tx.email.create({
            data: {
               email: data.email,
               isMain: true,
               userId: newUser.id,
            },
         })

         return newUser
      })

      // Set auth cookie and get token
      const token = setAuthCookie(user.id, data.email)

      revalidatePath('/user/account')
      return { success: true, userId: user.id, token }
   } catch (error) {
      console.error('Error registering user:', error)
      return { success: false, error: 'Failed to register user' }
   }
}

/**
 * Login with email and password
 */
export async function loginWithPassword(data: LoginUserInput) {
   try {
      // Find the email and associated user
      const userEmail = await prisma.email.findUnique({
         where: { email: data.email },
         include: { user: true },
      })

      if (!userEmail || !userEmail.user) {
         return { success: false, error: 'Invalid email or password' }
      }

      const user = userEmail.user

      // Check if user has password authentication set up
      if (!user.hashedPassword || !user.salt) {
         return { success: false, error: 'This account does not use password authentication' }
      }

      // Verify password
      const hashedAttempt = hashPassword(data.password, user.salt)
      if (hashedAttempt !== user.hashedPassword) {
         return { success: false, error: 'Invalid email or password' }
      }

      // Set auth cookie and get token
      const token = setAuthCookie(user.id, data.email)

      return { success: true, userId: user.id, token }
   } catch (error) {
      console.error('Error during login:', error)
      return { success: false, error: 'Login failed' }
   }
}

/**
 * Logout the current user
 */
export async function logout() {
   deleteAuthCookie()
   revalidatePath('/')
   return { success: true }
}

/**
 * Hash a password with the given salt
 */
function hashPassword(password: string, salt: string): string {
   return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
}

/**
 * Get the current user from the JWT token
 */
export async function getCurrentUser() {
   const payload = getTokenFromCookies()

   if (!payload || !payload.userId) {
      return null
   }

   try {
      // Fetch the user data
      const user = await prisma.user.findUnique({
         where: { id: payload.userId },
         include: {
            emails: true,
         },
      })

      return user
   } catch (error) {
      console.error('Error getting current user:', error)
      return null
   }
}
