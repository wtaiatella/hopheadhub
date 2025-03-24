import { cookies } from 'next/headers';
import { generateToken, verifyToken, JwtPayload } from './jwt';

// Type-safe wrapper for Next.js cookies
type CookieOptions = {
  name: string;
  value: string;
  httpOnly?: boolean;
  secure?: boolean;
  maxAge?: number;
  path?: string;
};

/**
 * Set the authentication cookie with JWT token
 */
export function setAuthCookie(userId: string, email?: string): string {
  // Generate JWT token
  const token = generateToken({ userId, email });
  
  try {
    // Using the correct type for cookies in Next.js
    const cookieJar = cookies();
    
    // Set the cookie
    cookieJar.set('auth_token', token, {
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
  } catch (error) {
    console.error('Error setting auth cookie:', error);
  }
  
  return token;
}

/**
 * Get the current user's token payload from cookies
 */
export function getTokenFromCookies(): JwtPayload | null {
  try {
    const tokenCookie = cookies().get('auth_token');
    
    if (!tokenCookie?.value) {
      return null;
    }
    
    return verifyToken(tokenCookie.value);
  } catch (error) {
    console.error('Error getting token from cookies:', error);
    return null;
  }
}

/**
 * Delete the authentication cookie (logout)
 */
export function deleteAuthCookie(): void {
  try {
    cookies().delete('auth_token');
  } catch (error) {
    console.error('Error deleting auth cookie:', error);
  }
}

/**
 * Get the raw JWT token from cookies
 */
export function getRawTokenFromCookies(): string | null {
  try {
    const tokenCookie = cookies().get('auth_token');
    return tokenCookie?.value || null;
  } catch (error) {
    console.error('Error getting raw token from cookies:', error);
    return null;
  }
}
