import { create } from 'zustand'
import { User, UserCreate, UserSignin } from '@/types/user'
import * as userAction from '@/app/action/user'
import * as authAction from '@/app/action/auth'

interface UserState {
   user: User | null
   isLoading: boolean
   error: string | null

   // Auth actions
   signup: (data: UserCreate) => Promise<{ success: boolean; error?: string }>
   signin: (data: UserSignin) => Promise<{ success: boolean; error?: string }>
   signout: () => Promise<void>
   fetchCurrentUser: () => Promise<{ success: boolean; error?: string }>

   // User profile actions
   updateProfile: (data: {
      name?: string
      nickname?: string
      city?: string
      state?: string
      website?: string
      company?: string
      beerInterests?: string[]
      profileImage?: string
   }) => Promise<{ success: boolean; error?: string }>

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
         // Check if user exists by email
         await userAction.isUserExistsByEmail(data.email)
         // Use the action to signup the user
         await userAction.createUserProfile(data)
         return { success: true }
      } catch (error) {
         console.error('Error creating user:', error)
         throw new Error('Failed to create user')
      } finally {
         set({ isLoading: false })
      }
   },

   signin: async (data: UserSignin) => {
      try {
         set({ isLoading: true, error: null })
         // Use the action to signin
         const result = await authAction.loginWithPassword(data)

         // Fetch user data after successful signin
         await get().fetchCurrentUser()
         return { success: true }
      } catch (error) {
         const errorMessage = error instanceof Error ? error.message : 'Signin failed'
         set({ error: errorMessage, isLoading: false })
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
      } catch (error) {
         console.error('Signout error:', error)
         set({ isLoading: false })
      }
   },

   fetchCurrentUser: async () => {
      set({ isLoading: true })
      try {
         // Use the service to get the current user
         const result = await authAction.getCurrentUser()

         if (result.success && result.user) {
            set({ user: result.user, isLoading: false })
            return { success: true }
         } else {
            set({ user: null, isLoading: false, error: result.error || null })
            return { success: false, error: result.error }
         }
      } catch (error) {
         const errorMessage = error instanceof Error ? error.message : 'Failed to fetch user'
         set({ user: null, error: errorMessage, isLoading: false })
         return { success: false, error: errorMessage }
      }
   },

   // User profile actions
   updateProfile: async data => {
      set({ isLoading: true, error: null })

      try {
         const userId = get().user?.id
         if (!userId) {
            set({ isLoading: false, error: 'User not authenticated' })
            return { success: false, error: 'User not authenticated' }
         }

         // Use the service to update the profile
         const result = await userService.updateUserProfile(userId, data)

         if (result.success && result.user) {
            // Update the user in the store with the updated data
            set({
               user: { ...get().user, ...result.user },
               isLoading: false,
            })
            return { success: true }
         } else {
            set({ isLoading: false, error: result.error || 'Failed to update profile' })
            return { success: false, error: result.error }
         }
      } catch (error) {
         const errorMessage = error instanceof Error ? error.message : 'Failed to update profile'
         set({ error: errorMessage, isLoading: false })
         return { success: false, error: errorMessage }
      }
   },

   // State management
   setUser: user => set({ user }),
   setLoading: isLoading => set({ isLoading }),
   setError: error => set({ error }),
}))
