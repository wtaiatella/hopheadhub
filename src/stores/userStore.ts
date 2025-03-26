import { create } from 'zustand'
import { User } from '@/types/user'
import { RegisterUserInput, LoginUserInput } from '@/types/register'

interface UserState {
   user: User | null
   isLoading: boolean
   error: string | null

   // Auth actions
   register: (data: RegisterUserInput) => Promise<{ success: boolean; error?: string }>
   login: (data: LoginUserInput) => Promise<{ success: boolean; error?: string }>
   logout: () => Promise<void>
   fetchCurrentUser: () => Promise<void>

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
   register: async (data: RegisterUserInput) => {
      set({ isLoading: true, error: null })
      try {
         const response = await fetch('/api/auth/register', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
         })

         const result = await response.json()

         if (!result.success) {
            set({ error: result.error || 'Registration failed', isLoading: false })
            return { success: false, error: result.error }
         }

         // Fetch user data after successful registration
         await get().fetchCurrentUser()
         return { success: true }
      } catch (error) {
         const errorMessage = error instanceof Error ? error.message : 'Registration failed'
         set({ error: errorMessage, isLoading: false })
         return { success: false, error: errorMessage }
      }
   },

   login: async (data: LoginUserInput) => {
      set({ isLoading: true, error: null })
      try {
         const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
         })

         const result = await response.json()

         if (!result.success) {
            set({ error: result.error || 'Login failed', isLoading: false })
            return { success: false, error: result.error }
         }

         // Fetch user data after successful login
         await get().fetchCurrentUser()
         return { success: true }
      } catch (error) {
         const errorMessage = error instanceof Error ? error.message : 'Login failed'
         set({ error: errorMessage, isLoading: false })
         return { success: false, error: errorMessage }
      }
   },

   logout: async () => {
      set({ isLoading: true })
      try {
         await fetch('/api/auth/logout', { method: 'DELETE' })
         set({ user: null, isLoading: false })
      } catch (error) {
         console.error('Logout error:', error)
         set({ isLoading: false })
      }
   },

   fetchCurrentUser: async () => {
      set({ isLoading: true })
      try {
         const response = await fetch('/api/auth/user')
         const data = await response.json()

         if (data.user) {
            set({ user: data.user, isLoading: false })
         } else {
            set({ user: null, isLoading: false })
         }
      } catch (error) {
         console.error('Error fetching user:', error)
         set({ user: null, isLoading: false })
      }
   },

   // State management
   setUser: user => set({ user }),
   setLoading: isLoading => set({ isLoading }),
   setError: error => set({ error }),
}))
