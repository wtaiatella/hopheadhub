import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyJWT } from '@/lib/tokens'

/**
 * GET /api/auth/logout
 * Logout the current user
 */
export async function DELETE(request: NextRequest) {
   const response = NextResponse.json({ success: true })
   response.cookies.delete('auth_token')
   return response
}

/**
 * GET /api/auth/user
 * Get the current user from the JWT token
 */
export async function GET(request: NextRequest) {
   const token = request.cookies.get('auth_token')?.value

   if (!token) {
      return NextResponse.json({ user: null }, { status: 401 })
   }

   try {
      // Verify the JWT token
      const payload = verifyJWT(token)

      if (!payload || !payload.userId) {
         return NextResponse.json({ user: null }, { status: 401 })
      }

      // Fetch the user data
      const user = await prisma.user.findUnique({
         where: { id: payload.userId },
         include: {
            emails: true,
         },
      })

      if (!user) {
         return NextResponse.json({ user: null }, { status: 401 })
      }

      // Don't return sensitive information
      const { hashedPassword, salt, ...safeUser } = user

      return NextResponse.json({ user: safeUser })
   } catch (error) {
      console.error('Error getting current user:', error)
      return NextResponse.json({ user: null }, { status: 500 })
   }
}
