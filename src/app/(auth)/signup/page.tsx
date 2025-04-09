'use client'
import { Button, message, Steps, Form, Divider } from 'antd'
import React from 'react'
import { useState } from 'react'
import { useUserStore } from '@/stores/userStore'
import { UserCreate } from '@/types/user'
import { useRouter } from 'next/navigation'

import UserInfo from './userInfo'
import LoginInfo from './loginInfo'

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
   const [signupForm] = Form.useForm<UserCreate>()
   const { signup } = useUserStore()
   const router = useRouter()

   const handleNextStep = async (): Promise<void> => {
      try {
         // Only validate the fields in the current step
         const fieldsToValidate = ['name', 'nickname', 'city', 'state', 'beerInterests', 'email']

         await signupForm.validateFields(fieldsToValidate)

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
         const formValues = await signupForm.validateFields()
         console.log('Sent Form with values:', formValues)

         // Call signup from userStore
         const result = await signup(formValues)

         if (result.success) {
            // Show appropriate message based on login method
            const isEmailLink = formValues.loginMethod === 1

            if (isEmailLink) {
               message.success('Check your email for a signup link!')
            } else {
               message.success('Registration completed successfully!')
            }

            // Redirect to signin page after successful registration
            setTimeout(() => {
               router.push('/signin')
            }, 2000)
         } else {
            message.error(result.error || 'Error during registration. Please try again.')
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
         <div className="flex items-start justify-center h-full bg-[url(/assets/cheers-at-sun-set.jpeg)] bg-center bg-cover bg-no-repeat">
            <h1 className="text-6xl font-bold text-white mt-20">Hop Head Hub</h1>
         </div>

         <div className="bg-background px-12 py-8">
            <div className="flex items-center justify-end">
               <a href="./" className="text-primary hover:underline">
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
                  <a href="/signin" className="text-primary hover:underline">
                     Sign in here
                  </a>
               </p>
            </div>
         </div>
      </>
   )
}
