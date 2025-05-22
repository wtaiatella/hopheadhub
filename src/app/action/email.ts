'use server'

import { prisma } from '@/lib/prisma'
import { Email } from '@/types/user'
import { generateToken } from '@/lib/tokens'
import { getAppUrl } from './env'
import { sendEmail } from '@/services/mail'

/**
 * Add a new email address to user
 */
export async function addUserEmail(userId: string, email: Email) {
   try {
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
      const updatedEmail = await prisma.email.update({
         where: { id: email.id },
         data: {
            email: email.email,
            isVerified: email.isVerified,
            isMain: email.isMain,
            verificationToken: email.verificationToken,
            verificationTokenExpiresAt: email.verificationTokenExpiresAt,
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
// TODO: add userId to delete email
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

export async function verifyEmailToken(token: string) {
   try {
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

      await prisma.email.update({
         where: { id: email.id },
         data: {
            isVerified: true,
            verifiedAt: new Date(),
            verificationToken: null,
            verificationTokenExpiresAt: null,
         },
      })

      return { success: true, email }
   } catch (error) {
      console.error('Error verifying email:', error)
      return {
         success: false,
         error: error instanceof Error ? error.message : 'Failed to verify email',
      }
   }
}

export async function verifyEmail(emailId: string, userId: string) {
   try {
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
      return {
         success: false,
         error: error instanceof Error ? error.message : 'Failed to verify email',
      }
   }
}
