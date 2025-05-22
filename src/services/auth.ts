import { cookies } from 'next/headers'
import { generateJWT, verifyJWT, JwtPayload } from '@/lib/tokens'

/**
 * Set the authentication cookie with JWT token
 */
export async function setAuthCookie(
   userId: string,
   email: string,
   rememberMe: boolean
): Promise<void> {
   try {
      // Generate JWT token
      const token = await generateJWT({ userId, email })
      // Using the correct type for cookies in Next.js
      const cookieStore = await cookies()
      console.log('Auth cookie set')
      console.log('Token:', token)
      console.log('Remember me:', rememberMe)
      console.log('Max age:', rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 1)

      // Set the cookie
      cookieStore.set('auth_token', token, {
         httpOnly: true,
         path: '/',
         secure: process.env.NODE_ENV === 'production',
         maxAge: rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 1, // 1 day or 30 days
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
export async function getTokenFromCookies(): Promise<{
   success: boolean
   payload?: JwtPayload
   error?: string
}> {
   try {
      const tokenCookie = (await cookies()).get('auth_token')

      if (!tokenCookie) {
         return { success: false, error: 'No auth token found' }
      }
      const payload = await verifyJWT(tokenCookie.value)
      if (!payload) {
         return { success: false, error: 'Invalid auth token' }
      }
      return { success: true, payload: { userId: payload.userId, email: payload.email } }
   } catch (error) {
      console.error('Error getting token from cookies:', error)
      throw new Error('Failed to get token from cookies')
   }
}
