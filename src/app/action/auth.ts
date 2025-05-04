'use server'

import { revalidatePath } from 'next/cache'
import { setAuthCookie, deleteAuthCookie, getTokenFromCookies } from '@/services/auth'
import { UserSignin } from '@/types/user'
import { hashPassword } from '@/lib/authUtils'
import { getUserByEmail, getUserById } from '@/app/action/user'
import { User } from '@/types/user'

/**
 * Login with email and password
 */
export async function loginWithPassword(
   data: UserSignin
): Promise<{ success: boolean; user?: User; error?: string }> {
   try {
      console.log('Login with email and password:', data)
      // Find the email and associated user
      const { success, message, user } = await getUserByEmail(data.email)
      console.log('User found:', user)

      if (!success || !user) {
         console.error(message)
         return { success: false, error: message }
      }

      if (!user.hashedPassword || !user.salt) {
         console.error('This account does not use password authentication')
         return { success: false, error: 'This account does not use password authentication' }
      }

      // Verify password
      const hashedAttempt = hashPassword(data.password, user.salt)
      console.log('Hashed attempt:', hashedAttempt)
      console.log('Hashed password:', user.hashedPassword)
      if (hashedAttempt !== user.hashedPassword) {
         console.error('Invalid email or password')
         return { success: false, error: 'Invalid email or password' }
      }

      // Set auth cookie and get token
      console.log('Setting auth cookie')
      console.log('User ID:', user.id)
      console.log('Email:', data.email)
      console.log('Remember me:', data.rememberMe)

      await setAuthCookie(user.id, data.email, data.rememberMe)
      console.log('Auth cookie set')
      return { success: true, user }
   } catch (error) {
      console.error('Error during login:', error)
      throw new Error('Login failed')
   }
}

/**
 * Logout the current user
 */
export async function logout() {
   try {
      await deleteAuthCookie()
      revalidatePath('/')
      return { success: true }
   } catch (error) {
      console.error('Error during logout:', error)
      throw new Error('Logout failed')
   }
}

/**
 * Get the current user from the JWT token
 */
export async function getCurrentUser() {
   try {
      const { success, payload, error } = await getTokenFromCookies()
      if (!success || !payload) {
         console.error(error)
         return { success: false, error: error }
      }
      // Fetch the user data
      const user = await getUserById(payload.userId)
      return { success: true, user: user.user }
   } catch (error) {
      console.error('Error getting current user:', error)
      throw new Error('Failed to get current user')
   }
}
