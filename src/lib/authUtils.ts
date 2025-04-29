import * as crypto from 'crypto'

/**
 * Generate salt and hash password
 */
export function setHashPassword(password: string | undefined): {
   salt: string | null
   hash: string | null
} {
   if (!password) {
      throw new Error('Failed to create hash password')
   }
   const salt = crypto.randomBytes(16).toString('hex')
   const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex')
   return { salt, hash }
}

/**
 * Hash a password with the given salt
 */
export function hashPassword(password: string | undefined, salt: string | null): string | null {
   if (!password || !salt) {
      throw new Error('Failed to hash password')
   }
   return crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex')
}
