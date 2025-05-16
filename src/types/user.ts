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
   number: z.string(),
   complement: z.string().optional().default(''),
   zipCode: z.string(),
   city: z.string(),
   state: z.string(),
   country: z.string(),
   eventId: z.string().nullable().optional(),
   userId: z.string(),
})

export type Address = z.infer<typeof addressSchema>

export const userSchema = z.object({
   id: z.string(),
   name: z.string(),
   nickname: z.string(),
   city: z.string(),
   state: z.string(),
   website: z.string().optional().default(''),
   company: z.string().optional().default(''),
   beerInterests: z.array(z.string()).default([]),
   profileImage: z.string().optional().default(''),
   hashedPassword: z.string().nullable().optional(),
   salt: z.string().nullable().optional(),
   emails: z.array(emailSchema).optional(),
   phoneNumbers: z.array(phoneNumberSchema).optional(),
   addresses: z.array(addressSchema).optional(),
   createdAt: z.date().optional(),
   updatedAt: z.date().optional(),
})

export type User = z.infer<typeof userSchema>

export const userCreateSchema = z
   .object({
      name: z.string().min(2, 'Name must be at least 2 characters'),
      nickname: z.string().min(2, 'Nickname must be at least 2 characters'),
      city: z.string(),
      state: z.string(),
      beerInterests: z.array(z.string()),
      email: z.string().email('Please enter a valid email'),
      loginMethod: z.enum(['notDefined', 'gmail', 'facebook', 'emailLink', 'password']),
      password: z.string().optional(),
      confirmPassword: z.string().optional(),
   })
   .refine(data => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'],
   })

export type UserCreate = z.infer<typeof userCreateSchema>

export const userSigninSchema = z.object({
   email: z.string().email('Please enter a valid email'),
   password: z.string().optional(),
   rememberMe: z.boolean().optional().default(false),
})

export type UserSignin = z.infer<typeof userSigninSchema>

export const userUpdateSchema = z.object({
   name: z.string().optional(),
   nickname: z.string().optional(),
   city: z.string().optional(),
   state: z.string().optional(),
   website: z.string().optional(),
   company: z.string().optional(),
   beerInterests: z.array(z.string()).optional(),
   profileImage: z.string().optional().default(''),
})

export type UserUpdate = z.infer<typeof userUpdateSchema>
