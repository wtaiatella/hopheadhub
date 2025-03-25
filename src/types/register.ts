import { z } from 'zod'

// Registration related schemas
export const registerUserSchema = z
   .object({
      name: z.string().min(2, 'Name must be at least 2 characters'),
      nickname: z.string().optional(),
      email: z.string().email('Please enter a valid email'),
      password: z.string().min(8, 'Password must be at least 8 characters'),
      confirmPassword: z.string().min(8, 'Password must be at least 8 characters'),
      beerInterests: z.array(z.string()).optional().default([]),
   })
   .refine(data => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'],
   })

export type RegisterUserInput = z.infer<typeof registerUserSchema>

export const loginUserSchema = z.object({
   email: z.string().email('Please enter a valid email'),
   password: z.string().min(1, 'Password is required'),
})

export type LoginUserInput = z.infer<typeof loginUserSchema>
