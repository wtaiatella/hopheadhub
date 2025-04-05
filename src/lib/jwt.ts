import jwt from 'jsonwebtoken'
import { getJwtSecret } from '@/app/action/env'

// Token expiration time
const EXPIRES_IN = '7d' // 7 days

export interface JwtPayload {
   userId: string
   email: string
}

/**
 * Generate a JWT token for a user
 */
export async function generateToken(payload: JwtPayload): Promise<string> {
   const secret = (await getJwtSecret()).secret

   if (!secret) {
      throw new Error('JWT secret is not defined')
   }

   return jwt.sign(payload, secret, { expiresIn: EXPIRES_IN })
}

/**
 * Verify a JWT token and return the payload
 */
export async function verifyToken(token: string): Promise<JwtPayload> {
   const secret = (await getJwtSecret()).secret

   if (!secret) {
      throw new Error('JWT secret is not defined')
   }

   try {
      return jwt.verify(token, secret) as JwtPayload
   } catch (error) {
      console.error('JWT verification error:', error)
      throw new Error('Failed to verify JWT token')
   }
}

/**
 * Extract JWT token from authorization header
 */
export async function extractTokenFromHeader(authHeader?: string): Promise<string | null> {
   const secret = (await getJwtSecret()).secret

   if (!secret) {
      throw new Error('JWT secret is not defined')
   }

   if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null
   }

   return authHeader.substring(7) // Remove 'Bearer ' prefix
}
