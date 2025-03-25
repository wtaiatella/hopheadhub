import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import * as crypto from 'crypto'
import { generateToken } from '@/lib/jwt'
import { RegisterUserInput } from '@/types/register'

/**
 * Hash a password with a given salt
 */
function hashPassword(password: string, salt: string): string {
   return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
}

/**
 * POST /api/auth/register
 * Register a new user with email and password
 */
export async function PUT(request: NextRequest) {
   try {
      const data = (await request.json()) as RegisterUserInput

      // Check if email already exists
      const existingEmail = await prisma.email.findUnique({
         where: { email: data.email },
      })

      if (existingEmail) {
         return NextResponse.json(
            { success: false, error: 'Email already registered' },
            { status: 400 }
         )
      }

      // Generate salt and hash password
      const salt = crypto.randomBytes(16).toString('hex')
      const hashedPassword = hashPassword(data.password, salt)

      // Create user and email in a transaction
      const user = await prisma.$transaction(async tx => {
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

      // Generate JWT token
      const token = generateToken({ userId: user.id, email: data.email })

      // Create response with cookie
      const response = NextResponse.json({
         success: true,
         userId: user.id,
         token,
      })

      // Set cookie
      response.cookies.set({
         name: 'auth_token',
         value: token,
         httpOnly: true,
         path: '/',
         secure: process.env.NODE_ENV === 'production',
         maxAge: 60 * 60 * 24 * 7, // 1 week
      })

      return response
   } catch (error) {
      console.error('Error registering user:', error)
      return NextResponse.json({ success: false, error: 'Registration failed' }, { status: 500 })
   }
}
