'use server'
import { prisma } from '@/lib/prisma'
import { PhoneNumber } from '@/types/user'

/**
 * Add a new phone number to user
 */
export async function addUserPhoneNumber(userId: string, phoneNumber: PhoneNumber) {
   try {
      const newPhoneNumber = await prisma.phoneNumber.create({
         data: {
            phoneNumber: phoneNumber.phoneNumber,
            verified: phoneNumber.verified,
            isMain: phoneNumber.isMain,
            userId,
         },
      })
      return { success: true, phoneNumber: newPhoneNumber }
   } catch (error) {
      console.error('Error adding phone number:', error)
      return { success: false, error: 'Failed to add phone number' }
   }
}

/**
 * Update a phone number from user
 */
export async function updateUserPhoneNumber(phoneNumber: PhoneNumber) {
   try {
      const updatedPhoneNumber = await prisma.phoneNumber.update({
         where: { id: phoneNumber.id },
         data: {
            phoneNumber: phoneNumber.phoneNumber,
            verified: phoneNumber.verified,
            isMain: phoneNumber.isMain,
         },
      })
      return { success: true, phoneNumber: updatedPhoneNumber }
   } catch (error) {
      console.error('Error updating phone number:', error)
      return { success: false, error: 'Failed to update phone number' }
   }
}

/**
 * Delete a phone number from user
 */
export async function deletePhoneNumber(phoneNumberId: string) {
   try {
      const deletedPhoneNumber = await prisma.phoneNumber.delete({
         where: { id: phoneNumberId },
      })
      return { success: true, phoneNumber: deletedPhoneNumber }
   } catch (error) {
      console.error('Error deleting phone number:', error)
      return { success: false, error: 'Failed to delete phone number' }
   }
}
