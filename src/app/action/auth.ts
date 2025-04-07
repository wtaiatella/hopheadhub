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
      // Find the email and associated user
      const userByEmail = await getUserByEmail(data.email)
      const user = userByEmail

      if (!user.hashedPassword || !user.salt) {
         console.error('This account does not use password authentication')
         throw new Error('This account does not use password authentication')
      }

      // Verify password
      const hashedAttempt = hashPassword(data.password, user.salt)
      if (hashedAttempt !== user.hashedPassword) {
         console.error('Invalid email or password')
         throw new Error('Invalid email or password')
      }

      // Set auth cookie and get token
      await setAuthCookie(user.id, data.email)

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
      const payload = await getTokenFromCookies()
      // Fetch the user data
      const user = await getUserById(payload.userId)
      return user
   } catch (error) {
      console.error('Error getting current user:', error)
      throw new Error('Failed to get current user')
   }
}
