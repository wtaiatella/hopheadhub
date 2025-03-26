'use server'
import { prisma } from '@/lib/prisma'
import { Email } from '@/types/user'

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
