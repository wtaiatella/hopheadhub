'use server'
import { prisma } from '@/lib/prisma'
import { User, UserCreate, UserUpdate } from '@/types/user'
import { setHashPassword } from '@/lib/authUtils'

/**
 * Verify is user exists by email
 */
export async function isUserExistsByEmail(
   email: string
): Promise<{ exists: boolean; message: string }> {
   try {
      const userEmail = await prisma.email.findUnique({
         where: { email },
      })

      if (userEmail) {
         console.error('User already exists with this email', userEmail)
         return { exists: true, message: 'User already exists with this email' }
      }

      return { exists: false, message: 'User does not exist' }
   } catch (error) {
      console.error('Error checking if user exists by email:', error)
      throw new Error('Failed to check if user exists')
   }
}

/**
 * Create user profile
 */
export async function createUserProfile(
   data: UserCreate
): Promise<{ success: boolean; message: string }> {
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
      return { success: true, message: 'User created successfully' }
   } catch (error) {
      console.error('Error creating user:', error)
      throw new Error('Failed to create user')
   }
}

/**
 * Get user profile by ID
 */
export async function getUserById(
   userId: string
): Promise<{ success: boolean; message: string; user: User | null }> {
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
         return { success: false, message: 'User not found', user: null }
      }
      return { success: true, message: 'User found successfully', user: userByID }
   } catch (error) {
      console.error('Error fetching user:', error)
      throw new Error('Failed to fetch user')
   }
}

/**
 * Get user by email
 */
export async function getUserByEmail(
   email: string
): Promise<{ success: boolean; message: string; user: User | null }> {
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
         return { success: false, message: 'User not found', user: null }
      }

      return { success: true, message: 'User found successfully', user: userEmail.user }
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
   data: UserUpdate
): Promise<{ success: boolean; message: string; userUpdated: User | null }> {
   try {
      const updatedUser = await prisma.user.update({
         where: { id: userId },
         data,
      })
      if (!updatedUser) {
         console.error('User not found')
         return { success: false, message: 'User not found', userUpdated: null }
      }

      return { success: true, message: 'User updated successfully', userUpdated: updatedUser }
   } catch (error) {
      console.error('Error updating user:', error)
      throw new Error('Failed to update user profile')
   }
}
