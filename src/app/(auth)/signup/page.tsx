'use client'
import { Button, message, Steps, Form } from 'antd'
import React from 'react'
import { useState } from 'react'

import userInfo from './userInfo'
import loginInfo from './loginInfo'

const steps = [
   {
      title: 'Sign up - Basic info',
      content: userInfo,
   },
   {
      title: 'Sign up - Login info',
      content: loginInfo,
   },
]

export default function Signup() {
   const [currentStep, setCurrentStep] = useState(0)
   const [signupForm] = Form.useForm()

   const handleNextStep = async () => {
      try {
         await signupForm.validateFields()
         setCurrentStep(currentStep + 1)
      } catch (error) {
         console.log('Validation Error:', error)
      }
   }

   const handlePrevStep = () => {
      setCurrentStep(currentStep - 1)
   }

   const handleFinish = async () => {
      try {
         const values = await signupForm.validateFields()
         console.log('Sent Form with values:', values)
         console.log('Todos os valores', signupForm.getFieldsValue())
      } catch (error) {
         console.log('Fail to validate or send form:', error)
      }
   }

   const stepTitles = steps.map(stepTitle => ({ key: stepTitle.title, title: stepTitle.title }))

   const CurrentStepContent = steps[currentStep].content

   return (
      <>
         <div className="flex items-center justify-center bg-[url(/assets/cheers-at-sun-set.jpeg)] bg-center bg-cover bg-no-repeat" />

         <div className="bg-background px-24 py-8">
            <div className="flex items-center justify-end mb-8">
               <a href="./">home</a>
            </div>
            <h1 className="text-4xl font-bold text-primary">Welcome to your beer community!</h1>

            <Steps current={currentStep} items={stepTitles} />
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
                        Sign up
                     </Button>
                  )}
                  {currentStep > 0 && <Button onClick={() => handlePrevStep()}>Previous</Button>}
               </div>
            </Form>
         </div>
      </>
   )
}
