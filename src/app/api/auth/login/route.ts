import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import * as crypto from 'crypto'
import { generateToken } from '@/lib/jwt'
import { LoginUserInput } from '@/types/user'

/**
 * Hash a password with the given salt
 */
function hashPassword(password: string, salt: string): string {
   return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
}

/**
 * POST /api/auth/login
 * Login with email and password
 */
export async function POST(request: NextRequest) {
   console.log('Received request to /api/auth/login')
   try {
      const data = (await request.json()) as LoginUserInput

      // Find the email and associated user
      const userEmail = await prisma.email.findUnique({
         where: { email: data.email },
         include: { user: true },
      })

      if (!userEmail || !userEmail.user) {
         return NextResponse.json(
            { success: false, error: 'Invalid email or password' },
            { status: 401 }
         )
      }

      const user = userEmail.user

      // Check if user has password authentication set up
      if (!user.hashedPassword || !user.salt) {
         return NextResponse.json(
            { success: false, error: 'This account does not use password authentication' },
            { status: 401 }
         )
      }

      // Verify password
      const hashedAttempt = hashPassword(data.password, user.salt)
      if (hashedAttempt !== user.hashedPassword) {
         return NextResponse.json(
            { success: false, error: 'Invalid email or password' },
            { status: 401 }
         )
      }

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
      console.error('Error during login:', error)
      return NextResponse.json({ success: false, error: 'Login failed' }, { status: 500 })
   }
}
