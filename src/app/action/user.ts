'use server'
import { prisma } from '@/lib/prisma'
import { User, UserCreate } from '@/types/user'
import { setHashPassword } from '@/lib/authUtils'

/**
 * Verify is user exists by email
 */
export async function isUserExistsByEmail(email: string): Promise<void> {
   try {
      const userEmail = await prisma.email.findUnique({
         where: { email },
      })

      if (userEmail) {
         throw new Error('User already exists with this email')
      }

      // If no user exists with this email, function completes successfully
   } catch (error) {
      console.error('Error checking if user exists by email:', error)
      throw new Error('Failed to check if user exists')
   }
}

/**
 * Create user profile
 */
export async function createUserProfile(data: UserCreate): Promise<void> {
   try {
      const { salt, hash } = setHashPassword(data.password)
      await prisma.user.create({
         data: {
            name: data.name,
            nickname: data.nickname,
            city: data.city,
            state: data.state,
            beerInterests: data.beerInterests,
            hashedPassword: hash,
            salt,
            emails: {
               create: [
                  {
                     email: data.email,
                     isMain: true,
                     verified: false,
                  },
               ],
            },
         },
      })
   } catch (error) {
      console.error('Error creating user:', error)
      throw new Error('Failed to create user')
   }
}

/**
 * Get user profile by ID
 */
export async function getUserById(userId: string): Promise<User> {
   try {
      const userByID = await prisma.user.findUnique({
         where: { id: userId },
         include: {
            emails: true,
            phoneNumbers: true,
            addresses: true,
         },
      })

      if (!userByID) {
         console.error('User not found')
         throw new Error('User not found')
      }
      return userByID
   } catch (error) {
      console.error('Error fetching user:', error)
      throw new Error('Failed to fetch user')
   }
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string): Promise<{ success: boolean; user: User }> {
   try {
      const userEmail = await prisma.email.findUnique({
         where: { email },
         include: {
            user: {
               include: {
                  emails: true,
                  phoneNumbers: true,
                  addresses: true,
               },
            },
         },
      })

      if (!userEmail || !userEmail.user) {
         console.error('User not found')
         throw new Error('User not found')
      }

      return { success: true, user: userEmail.user }
   } catch (error) {
      console.error('Error fetching user by email:', error)
      throw new Error('Failed to fetch user')
   }
}

/**
 * Update user profile
 */
export async function updateUserProfile(
   userId: string,
   data: {
      name?: string
      nickname?: string
      city?: string
      state?: string
      website?: string
      company?: string
      beerInterests?: string[]
      profileImage?: string
   }
) {
   try {
      const updatedUser = await prisma.user.update({
         where: { id: userId },
         data,
      })

      return { success: true, user: updatedUser }
   } catch (error) {
      console.error('Error updating user:', error)
      throw new Error('Failed to update user profile')
   }
}
