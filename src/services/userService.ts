/**
 * User Service
 *
 * This service handles all user-related operations by calling the appropriate server actions.
 * It acts as a facade between the UI components/stores and the server actions.
 */

import {
   loginWithPassword,
   logout as logoutAction,
   getCurrentUser as getCurrentUserAction,
} from '@/app/action/auth'
import {
   getUserByEmail,
   getUserById,
   updateUserProfile as updateUserProfileAction,
} from '@/app/action/user'

/**
 * Get the current logged-in user
 */
export async function getCurrentUser() {
   const user = await getCurrentUserAction()
   if (!user) {
      return { success: false, error: 'Not authenticated' }
   }
   return { success: true, user }
}

/**
 * Get user by ID
 */
export async function getUserProfileById(userId: string) {
   return await getUserById(userId)
}

/**
 * Get user by email
 */
export async function getUserProfileByEmail(email: string) {
   return await getUserByEmail(email)
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
   return await updateUserProfileAction(userId, data)
}
