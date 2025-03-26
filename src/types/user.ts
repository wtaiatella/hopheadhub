import { z } from 'zod'

export const emailSchema = z.object({
   id: z.string().optional(),
   email: z.string().email(),
   verified: z.boolean(),
   isMain: z.boolean(),
   userId: z.string(),
})

export type Email = z.infer<typeof emailSchema>

export const phoneNumberSchema = z.object({
   id: z.string().optional(),
   phoneNumber: z.string(),
   verified: z.boolean(),
   isMain: z.boolean(),
   userId: z.string(),
})

export type PhoneNumber = z.infer<typeof phoneNumberSchema>

export const addressSchema = z.object({
   id: z.string().optional(),
   name: z.string(),
   street: z.string(),
   number: z.string().optional(),
   complement: z.string().optional(),
   zipCode: z.string(),
   city: z.string(),
   state: z.string(),
   country: z.string(),
   eventId: z.string().optional(),
   userId: z.string(),
})

export type Address = z.infer<typeof addressSchema>

export const userSchema = z.object({
   id: z.string().optional(),
   name: z.string(),
   nickname: z.string(),
   city: z.string(),
   state: z.string(),
   website: z.string().optional(),
   company: z.string().optional(),
   beerInterests: z.array(z.string()).optional().default([]),
   profileImage: z.string().optional(),
   emails: z.array(emailSchema),
   phoneNumbers: z.array(phoneNumberSchema),
   addresses: z.array(addressSchema),
})

export type User = z.infer<typeof userSchema>

export const userInputSchema = z.object({
   name: z.string(),
   nickname: z.string(),
   city: z.string(),
   state: z.string(),
   beerInterests: z.array(z.string()).optional().default([]),
   email: z.string(),
   password: z.string().optional(),
})

export type UserInput = z.infer<typeof userInputSchema>
