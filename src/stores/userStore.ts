import { create } from 'zustand'
import { User, UserCreate, UserSignin, UserUpdate } from '@/types/user'
import * as userAction from '@/app/action/user'
import * as authAction from '@/app/action/auth'
import * as emailAction from '@/app/action/email'
import * as avatarAction from '@/app/action/avatar'
import { generateToken } from '@/lib/tokens'
import { getAppUrl } from '@/app/action/env'
import { sendEmail } from '@/services/mail'
import { getVerificationEmailTemplate } from '@/templates/emails/verification-email'

interface UserState {
   user: User | null
   isLoading: boolean
   error: string | null

   // Auth actions
   signup: (data: UserCreate) => Promise<{ success: boolean; error?: string }>
   signin: (data: UserSignin) => Promise<{ success: boolean; error?: string }>
   signout: () => Promise<{ success: boolean; error?: string }>
   fetchCurrentUser: () => Promise<{ success: boolean; error?: string }>
   sendVerificationEmail: (emailId: string) => Promise<{ success: boolean; error?: string }>

   // User profile actions
   updateProfile: (data: UserUpdate) => Promise<{ success: boolean; error?: string }>
   uploadAvatar: (file: File) => Promise<{ success: boolean; error?: string }>

   // State management
   setUser: (user: User | null) => void
   setLoading: (isLoading: boolean) => void
   setError: (error: string | null) => void
}

export const useUserStore = create<UserState>((set, get) => ({
   user: null,
   isLoading: false,
   error: null,

   // Auth actions
   signup: async (data: UserCreate) => {
      try {
         set({ isLoading: true, error: null })
         console.log('Creating user with data:', data)
         // Check if user exists by email
         const { exists, message } = await userAction.isUserExistsByEmail(data.email)
         if (exists) {
            set({ error: message })
            return { success: false, error: message }
         }
         // Use the action to signup the user
         const { success } = await userAction.createUserProfile(data)
         return { success }
      } catch (error) {
         console.error('Error creating user:', error)
         const errorMessage = error instanceof Error ? error.message : 'Failed to create user'
         set({ error: errorMessage })
         return {
            success: false,
            error: errorMessage,
         }
      } finally {
         set({ isLoading: false })
      }
   },

   signin: async (data: UserSignin) => {
      try {
         set({ isLoading: true, error: null })
         // Use the action to signin
         const { success, user, error } = await authAction.loginWithPassword(data)
         if (!success || !user) {
            set({ error })
            return { success: false, error }
         }

         // Fetch user data after successful signin
         await get().fetchCurrentUser()
         console.log('User signed in:', user)
         return { success: true }
      } catch (error) {
         console.error('Signin error:', error)
         const errorMessage = error instanceof Error ? error.message : 'Signin failed'
         set({ error: errorMessage })
         return { success: false, error: errorMessage }
      } finally {
         set({ isLoading: false })
      }
   },

   signout: async () => {
      try {
         set({ isLoading: true })
         // Use the service to signout
         await authAction.logout()
         set({ user: null, isLoading: false })
         return { success: true }
      } catch (error) {
         console.error('Signout error:', error)
         const errorMessage = error instanceof Error ? error.message : 'Signout failed'
         set({ error: errorMessage })
         return { success: false, error: errorMessage }
      } finally {
         set({ isLoading: false })
      }
   },

   fetchCurrentUser: async () => {
      try {
         set({ isLoading: true })
         // Use the service to get the current user
         const { success, user, error } = await authAction.getCurrentUser()
         if (!success || !user) {
            set({ error })
            return { success: false, error }
         }
         set({ user })
         return { success: true }
      } catch (error) {
         console.error('Failed to fetch user', error)
         const errorMessage = error instanceof Error ? error.message : 'Failed to fetch user'
         set({ user: null, error: errorMessage })
         return {
            success: false,
            error: errorMessage,
         }
      } finally {
         set({ isLoading: false })
      }
   },

   // User profile actions
   updateProfile: async (data: UserUpdate) => {
      try {
         set({ isLoading: true, error: null })
         await get().fetchCurrentUser()
         const user = get().user

         if (!user) {
            console.error('User not authenticated')
            return { success: false, error: 'User not authenticated' }
         }

         // Use the service to update the profile
         const { success, userUpdated, message } = await userAction.updateUserProfile(user.id, data)
         if (!success || !userUpdated) {
            set({ error: message })
            return { success: false, error: message }
         }
         // Update the user in the store with the updated data
         set({
            user: { ...user, ...userUpdated },
         })
         return { success: true }
      } catch (error) {
         console.error('Failed to update user', error)
         set({ error: error instanceof Error ? error.message : 'Failed to update user' })
         return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to update user',
         }
      } finally {
         set({ isLoading: false })
      }
   },

   uploadAvatar: async (file: File) => {
      try {
         set({ isLoading: true, error: null })
         await get().fetchCurrentUser()
         const user = get().user

         if (!user) {
            console.error('User not authenticated')
            return { success: false, error: 'User not authenticated' }
         }

         // Use the avatar action to upload the file to S3
         const { success, url, error } = await avatarAction.uploadAvatar(user.id, file)

         if (!success || !url) {
            set({ error: error || 'Failed to upload avatar' })
            return { success: false, error: error || 'Failed to upload avatar' }
         }

         // Update the user profile with the new avatar URL
         const updateResult = await get().updateProfile({ profileImage: url })

         if (!updateResult.success) {
            return { success: false, error: updateResult.error }
         }

         return { success: true, url }
      } catch (error) {
         console.error('Failed to upload avatar', error)
         const errorMessage = error instanceof Error ? error.message : 'Failed to upload avatar'
         set({ error: errorMessage })
         return {
            success: false,
            error: errorMessage,
         }
      } finally {
         set({ isLoading: false })
      }
   },

   sendVerificationEmail: async (emailId: string) => {
      try {
         set({ isLoading: true, error: null })
         await get().fetchCurrentUser()
         const user = get().user

         if (!user) {
            console.error('User not authenticated')
            return { success: false, error: 'User not authenticated' }
         }
         // use action to verify email
         const { success, error, email } = await emailAction.verifyEmail(emailId, user.id)
         if (!success || !email) {
            set({ error })
            return { success: false, error: error || 'Failed to verify email' }
         }

         // Generate verification token (expires in 24 hours)
         const verificationToken = generateToken()
         const verificationTokenExpiresAt = new Date()
         verificationTokenExpiresAt.setHours(verificationTokenExpiresAt.getHours() + 24)

         // update email
         await emailAction.updateUserEmail({
            ...email,
            verificationToken,
            verificationTokenExpiresAt,
         })

         // Get app url from .env
         const appUrl = await getAppUrl()
         if (!appUrl.success) {
            console.error('Error getting app URL:', appUrl.error)
            return { success: false, error: 'Failed to get app URL' }
         }

         // Send verification email
         const verificationUrl = `${appUrl.url}/api/email/verify?token=${verificationToken}`
         const html = getVerificationEmailTemplate(user.name || 'there', verificationUrl)

         const { success: sendEmailSuccess, error: sendEmailError } = await sendEmail(
            email.email,
            'Verify your email address',
            html
         )

         if (!sendEmailSuccess) {
            console.error('Error sending verification email:', sendEmailError)
            return { success: false, error: 'Failed to send verification email' }
         }

         return { success: true }
      } catch (error) {
         console.error('Error in sendVerificationEmail:', error)
         return {
            success: false,
            error: error instanceof Error ? error.message : 'An error occurred',
         }
      }
   },

   // State management
   setUser: user => set({ user }),
   setLoading: isLoading => set({ isLoading }),
   setError: error => set({ error }),
}))
