/*
 * Signup page
 *
 * @author wtaia
 * @version 1.0
 * @date 2025-04-17
 * @license MIT
 *
 * TODO:
 * - add Country field
 * - add signup by Google
 * - add signup by Facebook
 * - add signup by Apple
 * - add signup by Email Link
 * - modify Success message to use Result component from Antd
 * - modify Error message to use Result component from Antd
 * - add loading state
 */

'use client'
import { Button, message, Steps, Form } from 'antd'
import React from 'react'
import { useState } from 'react'
import { useUserStore } from '@/stores/userStore'
import { UserCreate } from '@/types/user'
import { useRouter } from 'next/navigation'

import UserInfo from './userInfo'
import LoginInfo from './loginInfo'
import Image from 'next/image'

// Define step structure
interface StepItem {
   title: string
   content: React.FC
}

const steps: StepItem[] = [
   {
      title: 'Personal Information',
      content: UserInfo,
   },
   {
      title: 'Login Information',
      content: LoginInfo,
   },
]

export default function Signup(): React.ReactElement {
   const [currentStep, setCurrentStep] = useState<number>(0)
   const [signupData, setSignupData] = useState<UserCreate>({
      name: '',
      nickname: '',
      city: '',
      state: '',
      beerInterests: [],
      email: '',
      loginMethod: 'notDefined',
   })
   const [signupForm] = Form.useForm<UserCreate>()
   const { signup } = useUserStore()
   const router = useRouter()

   const handleNextStep = async (): Promise<void> => {
      try {
         // Only validate the fields in the current step
         const fieldsToValidate = ['name', 'nickname', 'city', 'state', 'beerInterests', 'email']

         const userInfoValues = await signupForm.validateFields(fieldsToValidate)
         console.log('Sent Form with values:', userInfoValues)
         setSignupData(prev => ({ ...prev, ...userInfoValues }))
         setCurrentStep(currentStep + 1)
      } catch (error) {
         console.log('Validation Error:', error)
      }
   }

   const handlePrevStep = (): void => {
      setCurrentStep(currentStep - 1)
   }

   const handleFinish = async (): Promise<void> => {
      try {
         const fieldsToValidate = ['loginMethod', 'password', 'confirmPassword']
         const loginInfoValues = await signupForm.validateFields(fieldsToValidate)
         console.log('Sent Form with values:', loginInfoValues)

         // Call signup from userStore
         const signupResult = await signup({ ...signupData, ...loginInfoValues })

         if (signupResult.success) {
            // Show appropriate message based on login method
            const isEmailLink = loginInfoValues.loginMethod === 'emailLink'

            if (isEmailLink) {
               message.success('Check your email for a signup link!')
               setTimeout(() => {
                  router.push('/')
               }, 2000)
            } else {
               message.success('Registration completed successfully!')
               setTimeout(() => {
                  router.push('/signin')
               }, 2000)
            }
         } else {
            message.error(signupResult.error || 'Error during registration. Please try again.')
         }
      } catch (error) {
         console.log('Failed to validate or send form:', error)
         message.error('Error during registration. Please try again.')
      }
   }

   const stepTitles = steps.map(stepTitle => ({ key: stepTitle.title, title: stepTitle.title }))

   const CurrentStepContent = steps[currentStep].content

   return (
      <>
         <div className="flex items-center justify-center h-full relative">
            <h1 className="text-6xl font-bold text-white absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap">
               Hop Head Hub
            </h1>
            <Image
               src="/assets/cheers-at-sun-set.jpeg"
               alt="Cheers at sunset"
               width={800}
               height={533}
               className="object-cover h-full"
               priority
            />
         </div>

         <div className="bg-background px-12 py-8">
            <div className="flex items-center justify-end">
               <a href="./" className="text-primary hover:text-primary-hover hover:underline">
                  Home
               </a>
            </div>
            <h1 className="text-3xl font-bold text-primary my-8">
               Welcome to your beer community!
            </h1>

            <Steps current={currentStep} items={stepTitles} />

            <div className="bg-white p-6 mt-8 rounded-lg shadow-md">
               <Form form={signupForm} layout="vertical" onFinish={handleFinish} preserve={true}>
                  <CurrentStepContent />

                  <div className="flex items-center justify-start mt-4 gap-4">
                     {currentStep < steps.length - 1 && (
                        <Button type="primary" onClick={() => handleNextStep()}>
                           Next
                        </Button>
                     )}
                     {currentStep === steps.length - 1 && (
                        <Button type="primary" htmlType="submit">
                           Complete Registration
                        </Button>
                     )}
                     {currentStep > 0 && <Button onClick={() => handlePrevStep()}>Back</Button>}
                  </div>
               </Form>
            </div>

            <div className="text-center mt-2">
               <p>
                  Already have an account?{' '}
                  <a
                     href="/signin"
                     className="text-primary hover:text-primary-hover hover:underline"
                  >
                     Sign in here
                  </a>
               </p>
            </div>
         </div>
      </>
   )
}
