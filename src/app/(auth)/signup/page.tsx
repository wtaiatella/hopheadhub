'use client'
import { Button, message, Steps, Form, Divider } from 'antd'
import React from 'react'
import { useState } from 'react'

import UserInfo from './userInfo'
import LoginInfo from './loginInfo'

// Define step structure
interface StepItem {
   title: string
   content: React.FC
}

// Define form values structure
interface SignupFormValues {
   // User info
   name: string
   nickname?: string
   phone: string
   birthDate: Date
   city: string
   state: string

   // Login info
   email: string
   password: string
   confirmPassword: string
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
   const [signupForm] = Form.useForm<SignupFormValues>()

   const handleNextStep = async (): Promise<void> => {
      try {
         await signupForm.validateFields()
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
         const values = await signupForm.validateFields()
         console.log('Sent Form with values:', values)
         message.success('Registration completed successfully!')
         // Here you can add logic to send data to the server
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
               <Form form={signupForm} layout="vertical" onFinish={handleFinish}>
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
