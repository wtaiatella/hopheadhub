'use server'
import { prisma } from '@/lib/prisma'
import { User, UserInput } from '@/types/user'

/**
 * Create user profile
 */
export async function createUserProfile(
   data: UserInput
): Promise<{ success: boolean; user?: User; error?: string }> {
   try {
      const user = await prisma.user.create({
         data: {
            name: data.name,
            nickname: data.nickname,
            city: data.city,
            state: data.state,
            beerInterests: data.beerInterests,
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

      return { success: true, user }
   } catch (error) {
      console.error('Error creating user:', error)
      return { success: false, error: 'Failed to create user' }
   }
}

/**
 * Get user profile by ID
 */
export async function getUserById(
   userId: string
): Promise<{ success: boolean; user?: User; error?: string }> {
   try {
      const user = await prisma.user.findUnique({
         where: { id: userId },
         include: {
            emails: true,
            phoneNumbers: true,
            addresses: true,
            createdEvents: true,
            bookings: true,
            accounts: true,
         },
      })

      if (!user) {
         return { success: false, error: 'User not found' }
      }

      return { success: true, user }
   } catch (error) {
      console.error('Error fetching user:', error)
      return { success: false, error: 'Failed to fetch user' }
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
      return { success: false, error: 'Failed to update user profile' }
   }
}
