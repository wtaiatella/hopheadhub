'use server'

import { prisma } from '@/lib/prisma'
import { Email } from '@/types/user'

/**
 * Add a new email address to user
 */
export async function addUserEmail(userId: string, email: Email) {
   try {
      if (!userId || !email.email) {
         return { success: false, error: 'User ID and email are required' }
      }
      const newEmail = await prisma.email.create({
         data: {
            email: email.email,
            isVerified: email.isVerified,
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
// TODO: add userId to update email
export async function updateUserEmail(email: Email) {
   try {
      if (!email.id || !email.email) {
         return { success: false, error: 'Email ID and email are required' }
      }
      // Prepare the update data with token fields
      const updateData: Email = {
         email: email.email,
         isVerified: email.isVerified,
         isMain: email.isMain,
         userId: email.userId,
      }
      if (email.verificationToken) {
         updateData.verificationToken = email.verificationToken
      }
      if (email.verificationTokenExpiresAt) {
         updateData.verificationTokenExpiresAt = email.verificationTokenExpiresAt
      }
      const updatedEmail = await prisma.email.update({
         where: { id: email.id },
         data: updateData,
      })
      if (!updatedEmail) {
         return { success: false, error: 'Failed to update email' }
      }
      return { success: true, email: updatedEmail }
   } catch (error) {
      console.error('Error updating email:', error)
      throw new Error('Failed to update email')
   }
}

/**
 * Delete an email from user
 */
// TODO: add userId to delete email
export async function deleteEmail(emailId: string) {
   try {
      if (!emailId) {
         return { success: false, error: 'Email ID is required' }
      }
      const deletedEmail = await prisma.email.delete({
         where: { id: emailId },
      })
      if (!deletedEmail) {
         return { success: false, error: 'Failed to delete email' }
      }
      return { success: true, email: deletedEmail }
   } catch (error) {
      console.error('Error deleting email:', error)
      throw new Error('Failed to delete email')
   }
}

export async function verifyEmailToken(token: string) {
   try {
      if (!token) {
         return { success: false, error: 'Verification token is required' }
      }
      const email = await prisma.email.findFirst({
         where: {
            verificationToken: token,
            verificationTokenExpiresAt: {
               gt: new Date(), // Token not expired
            },
         },
      })

      if (!email) {
         return {
            success: false,
            error: 'Invalid or expired verification token',
         }
      }

      const updatedEmail = await prisma.email.update({
         where: { id: email.id },
         data: {
            isVerified: true,
            verifiedAt: new Date(),
            verificationToken: null,
            verificationTokenExpiresAt: null,
         },
      })
      if (!updatedEmail) {
         return { success: false, error: 'Failed to verify email' }
      }
      return { success: true, email: updatedEmail }
   } catch (error) {
      console.error('Error verifying email:', error)
      throw new Error('Failed to verify email')
   }
}

export async function verifyEmail(emailId: string, userId: string) {
   try {
      if (!emailId || !userId) {
         return { success: false, error: 'Email ID and user ID are required' }
      }
      const email = await prisma.email.findFirst({
         where: {
            id: emailId,
            userId,
         },
      })

      if (!email) {
         return {
            success: false,
            error: 'Email not found',
         }
      }

      return { success: true, email }
   } catch (error) {
      console.error('Error verifying email:', error)
      throw new Error('Failed to verify email')
   }
}
