'use server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { Prisma } from '@prisma/client'
import { User, Email, UserInput, Address, PhoneNumber } from '@/types/user'

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

/**
 * Add a new email address to user
 */
export async function addUserEmail(userId: string, email: Email) {
   try {
      await prisma.email.create({
         data: {
            ...email,
            userId,
         },
      })

      return { success: true }
   } catch (error) {
      console.error('Error adding email:', error)
      return { success: false, error: 'Failed to add email' }
   }
}

/**
 * Update an email from user
 */
export async function updateUserEmail(userId: string, email: Email) {
   try {
      await prisma.email.update({
         where: { email: email.email, userId },
         data: { ...email },
      })

      return { success: true }
   } catch (error) {
      console.error('Error updating email:', error)
      return { success: false, error: 'Failed to update email' }
   }
}

/**
 * Delete an email from user
 */
export async function deleteEmail(userId: string, email: string) {
   try {
      await prisma.email.delete({
         where: { email, userId },
      })

      return { success: true }
   } catch (error) {
      console.error('Error deleting email:', error)
      return { success: false, error: 'Failed to delete email' }
   }
}

/**
 * Add a new phone number to user
 */
export async function addUserPhoneNumber(userId: string, phoneNumber: PhoneNumber) {
   try {
      await prisma.phoneNumber.create({
         data: {
            ...phoneNumber,
            userId,
         },
      })

      return { success: true }
   } catch (error) {
      console.error('Error adding phone number:', error)
      return { success: false, error: 'Failed to add phone number' }
   }
}

/**
 * Add a new address to user
 */
export async function addUserAddress(
   userId: string,
   address: {
      name: string
      street: string
      number?: string
      complement?: string
      zipCode: string
      city: string
      state: string
      country: string
   }
) {
   try {
      await prisma.address.create({
         data: {
            ...address,
            userId,
         },
      })

      return { success: true }
   } catch (error) {
      console.error('Error adding address:', error)
      return { success: false, error: 'Failed to add address' }
   }
}

/**
 * Delete a phone number from user
 */
export async function deletePhoneNumber(userId: string, phoneNumberId: string) {
   try {
      await prisma.phoneNumber.delete({
         where: { id: phoneNumberId, userId },
      })

      return { success: true }
   } catch (error) {
      console.error('Error deleting phone number:', error)
      return { success: false, error: 'Failed to delete phone number' }
   }
}

/**
 * Delete an address from user
 */
export async function deleteAddress(userId: string, addressId: string) {
   try {
      await prisma.address.delete({
         where: { id: addressId, userId },
      })

      return { success: true }
   } catch (error) {
      console.error('Error deleting address:', error)
      return { success: false, error: 'Failed to delete address' }
   }
}
