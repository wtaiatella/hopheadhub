import { cookies } from 'next/headers'
import { generateToken, verifyToken, JwtPayload } from '@/lib/jwt'

/**
 * Set the authentication cookie with JWT token
 */
export async function setAuthCookie(userId: string, email: string): Promise<void> {
   try {
      // Generate JWT token
      const token = await generateToken({ userId, email })
      // Using the correct type for cookies in Next.js
      const cookieStore = await cookies()

      // Set the cookie
      cookieStore.set('auth_token', token, {
         httpOnly: true,
         path: '/',
         secure: process.env.NODE_ENV === 'production',
         maxAge: 60 * 60 * 24 * 7, // 1 week
      })
   } catch (error) {
      console.error('Error setting auth cookie:', error)
      throw new Error('Failed to set auth cookie')
   }
}

/**
 * Delete the authentication cookie (logout)
 */
export async function deleteAuthCookie(): Promise<void> {
   try {
      const cookieStore = await cookies()
      cookieStore.delete('auth_token')
   } catch (error) {
      console.error('Error deleting auth cookie:', error)
      throw new Error('Failed to delete auth cookie')
   }
}

/**
 * Get the current user's token payload from cookies
 */
export async function getTokenFromCookies(): Promise<JwtPayload> {
   try {
      const tokenCookie = (await cookies()).get('auth_token')

      if (!tokenCookie) {
         throw new Error('Failed to get token from cookies')
      }
      return verifyToken(tokenCookie.value)
   } catch (error) {
      console.error('Error getting token from cookies:', error)
      throw new Error('Failed to get token from cookies')
   }
}
