'use server'
import { prisma } from '@/lib/prisma'
import { Address } from '@/types/user'

/**
 * Add a new address to user
 */
export async function addUserAddress(userId: string, address: Address) {
   try {
      const newAddress = await prisma.address.create({
         data: {
            name: address.name,
            street: address.street,
            number: address.number,
            complement: address.complement,
            zipCode: address.zipCode,
            city: address.city,
            state: address.state,
            country: address.country,
            eventId: address.eventId,
            userId,
         },
      })
      return { success: true, address: newAddress }
   } catch (error) {
      console.error('Error adding address:', error)
      return { success: false, error: 'Failed to add address' }
   }
}

/**
 * Update an address from user
 */
export async function updateUserAddress(address: Address) {
   try {
      const updatedAddress = await prisma.address.update({
         where: { id: address.id },
         data: {
            name: address.name,
            street: address.street,
            number: address.number,
            complement: address.complement,
            zipCode: address.zipCode,
            city: address.city,
            state: address.state,
            country: address.country,
            eventId: address.eventId,
         },
      })
      return { success: true, address: updatedAddress }
   } catch (error) {
      console.error('Error updating address:', error)
      return { success: false, error: 'Failed to update address' }
   }
}

/**
 * Delete an address from user
 */
export async function deleteAddress(addressId: string) {
   try {
      const deletedAddress = await prisma.address.delete({
         where: { id: addressId },
      })
      return { success: true, address: deletedAddress }
   } catch (error) {
      console.error('Error deleting address:', error)
      return { success: false, error: 'Failed to delete address' }
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
