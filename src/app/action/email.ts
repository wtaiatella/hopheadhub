'use server'
import { prisma } from '@/lib/prisma'
import { Email } from '@/types/user'

/**
 * Add a new email address to user
 */
export async function addUserEmail(userId: string, email: Email) {
   try {
      const newEmail = await prisma.email.create({
         data: {
            email: email.email,
            verified: email.verified,
            isMain: email.isMain,
            userId,
         },
      })
      return { success: true, email: newEmail }
   } catch (error) {
      console.error('Error adding email:', error)
      return { success: false, error: 'Failed to add email' }
   }
}

/**
 * Update an email from user
 */
export async function updateUserEmail(email: Email) {
   try {
      const updatedEmail = await prisma.email.update({
         where: { id: email.id },
         data: {
            email: email.email,
            verified: email.verified,
            isMain: email.isMain,
         },
      })
      return { success: true, email: updatedEmail }
   } catch (error) {
      console.error('Error updating email:', error)
      return { success: false, error: 'Failed to update email' }
   }
}

/**
 * Delete an email from user
 */
export async function deleteEmail(emailId: string) {
   try {
      const deletedEmail = await prisma.email.delete({
         where: { id: emailId },
      })
      return { success: true, email: deletedEmail }
   } catch (error) {
      console.error('Error deleting email:', error)
      return { success: false, error: 'Failed to delete email' }
   }
}
