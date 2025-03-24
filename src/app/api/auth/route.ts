import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as crypto from 'crypto';
import { generateToken, verifyToken } from '@/lib/jwt';

/**
 * Hash a password with the given salt
 */
function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}

/**
 * POST /api/auth/login
 * Login with email and password
 */
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Find the email and associated user
    const userEmail = await prisma.email.findUnique({
      where: { email },
      include: { user: true }
    });

    if (!userEmail || !userEmail.user) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const user = userEmail.user;

    // Check if user has password authentication set up
    if (!user.hashedPassword || !user.salt) {
      return NextResponse.json(
        { success: false, error: 'This account does not use password authentication' },
        { status: 401 }
      );
    }

    // Verify password
    const hashedAttempt = hashPassword(password, user.salt);
    if (hashedAttempt !== user.hashedPassword) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = generateToken({ userId: user.id, email });

    // Create response with cookie
    const response = NextResponse.json({ 
      success: true, 
      userId: user.id,
      token
    });

    // Set cookie
    response.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return response;
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json(
      { success: false, error: 'Login failed' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/auth/logout
 * Logout the current user
 */
export async function DELETE(request: NextRequest) {
  const response = NextResponse.json({ success: true });
  response.cookies.delete('auth_token');
  return response;
}

/**
 * GET /api/auth/user
 * Get the current user from the JWT token
 */
export async function GET(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  
  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  try {
    // Verify the JWT token
    const payload = verifyToken(token);
    
    if (!payload || !payload.userId) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    // Fetch the user data
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: {
        emails: true,
      }
    });

    if (!user) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    // Don't return sensitive information
    const { hashedPassword, salt, ...safeUser } = user;
    
    return NextResponse.json({ user: safeUser });
  } catch (error) {
    console.error('Error getting current user:', error);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}
