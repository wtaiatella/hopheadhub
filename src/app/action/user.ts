'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

/**
 * Create a new user with a main email address
 */
export async function createUser(data: {
  name: string
  nickname?: string
  website?: string
  company?: string
  beerInterests: string[]
  email: string
}) {
  try {
    // Create user and their main email in a transaction
    const user = await prisma.$transaction(async (tx) => {
      // Create the user
      const newUser = await tx.user.create({
        data: {
          name: data.name,
          nickname: data.nickname,
          website: data.website,
          company: data.company,
          beerInterests: data.beerInterests,
        },
      })

      // Create the main email for this user
      await tx.email.create({
        data: {
          email: data.email,
          isMain: true,
          userId: newUser.id,
        },
      })

      return newUser
    })

    revalidatePath('/user/account')
    return { success: true, user }
  } catch (error) {
    console.error('Error creating user:', error)
    return { success: false, error: 'Failed to create user' }
  }
}

/**
 * Get user profile by ID
 */
export async function getUserById(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        emails: true,
        phoneNumbers: true,
        addresses: true,
      },
    })

    if (!user) {
      return { success: false, error: 'User not found' }
    }

    return { success: true, user }
  } catch (error) {
    console.error('Error fetching user:', error)
    return { success: false, error: 'Failed to fetch user' }
  }
}

/**
 * Update user profile
 */
export async function updateUserProfile(userId: string, data: {
  name?: string
  nickname?: string
  website?: string
  company?: string
  beerInterests?: string[]
  profileImage?: string
}) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data,
    })

    revalidatePath('/user/account')
    return { success: true, user: updatedUser }
  } catch (error) {
    console.error('Error updating user:', error)
    return { success: false, error: 'Failed to update user profile' }
  }
}

/**
 * Add a new email address to user
 */
export async function addUserEmail(userId: string, email: string, setAsMain: boolean = false) {
  try {
    // Begin transaction
    await prisma.$transaction(async (tx) => {
      // If setting as main, update all existing emails to not be main
      if (setAsMain) {
        await tx.email.updateMany({
          where: { userId },
          data: { isMain: false },
        })
      }

      // Create the new email
      await tx.email.create({
        data: {
          email,
          isMain: setAsMain,
          userId,
        },
      })
    })

    revalidatePath('/user/contact')
    return { success: true }
  } catch (error) {
    console.error('Error adding email:', error)
    return { success: false, error: 'Failed to add email' }
  }
}

/**
 * Add a new phone number to user
 */
export async function addUserPhoneNumber(userId: string, phoneNumber: string, setAsMain: boolean = false) {
  try {
    // Begin transaction
    await prisma.$transaction(async (tx) => {
      // If setting as main, update all existing phone numbers to not be main
      if (setAsMain) {
        await tx.phoneNumber.updateMany({
          where: { userId },
          data: { isMain: false },
        })
      }

      // Create the new phone number
      await tx.phoneNumber.create({
        data: {
          phoneNumber,
          isMain: setAsMain,
          userId,
        },
      })
    })

    revalidatePath('/user/contact')
    return { success: true }
  } catch (error) {
    console.error('Error adding phone number:', error)
    return { success: false, error: 'Failed to add phone number' }
  }
}

/**
 * Add a new address to user
 */
export async function addUserAddress(userId: string, address: {
  name: string
  street: string
  number?: string
  complement?: string
  zipCode: string
  city: string
  state: string
  country: string
}) {
  try {
    await prisma.address.create({
      data: {
        ...address,
        userId,
      },
    })

    revalidatePath('/user/account')
    return { success: true }
  } catch (error) {
    console.error('Error adding address:', error)
    return { success: false, error: 'Failed to add address' }
  }
}
