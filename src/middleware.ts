import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/jwt'

// Add paths that should be accessible without authentication
const publicPaths = [
   '/',
   '/events',
   '/suppliers',
   '/recipes',
   '/signin',
   '/signup',
   '/user',
   '/user/account',
   '/user/contact',
   '/user/bookings',
   '/user/events',
]

// Function to check if the path is public
const isPublicPath = (path: string) => {
   return publicPaths.some(
      publicPath =>
         path === publicPath ||
         path.startsWith('/api') ||
         path.startsWith('/_next') ||
         path.startsWith('/favicon') ||
         path.startsWith('/assets')
   )
}

export function middleware(request: NextRequest) {
   const path = request.nextUrl.pathname

   // Allow access to public paths without authentication
   if (isPublicPath(path)) {
      return NextResponse.next()
   }

   // Get the token from the cookies
   const token = request.cookies.get('auth_token')?.value

   // If no token is present, redirect to login
   if (!token) {
      return NextResponse.redirect(new URL('/signin', request.url))
   }

   // Verify the token
   const payload = verifyToken(token)

   // If token is invalid, redirect to login
   if (!payload) {
      const response = NextResponse.redirect(new URL('/signin', request.url))
      response.cookies.delete('auth_token')
      return response
   }

   // Token is valid, proceed
   return NextResponse.next()
}

// Configure the middleware to run on specific paths
export const config = {
   matcher: [
      // Apply to all routes except static files
      '/((?!_next/static|_next/image|favicon.ico).*)',
   ],
}
