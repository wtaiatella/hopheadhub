'use client'

import { Form, Input, Button, Divider, Radio, RadioChangeEvent } from 'antd'
import React, { useState } from 'react'
import Image from 'next/image'

// Define interface for login information
interface LoginInfo {
   email: string
   password: string
   confirmPassword: string
}

export default function LoginInfo(): React.ReactElement {
   const [valueLoginMethod, setValueLoginMethod] = useState<number | null>(null)

   const onChangeLoginMethod = (e: RadioChangeEvent) => {
      setValueLoginMethod(e.target.value)
   }

   const isPasswordRequired = valueLoginMethod === 2

   return (
      <>
         <div className="mb-6">
            <p className="mb-4 w-full text-center text-2xl font-bold text-primary">
               Here you can choose how to sign up
            </p>
            <p className="mb-2">You can sign up using your social accounts:</p>
            <div className="flex items-center gap-4">
               <Button type="default" className="flex items-center gap-2">
                  <Image src="/assets/icons/google.png" alt="Google" width={20} height={20} />
                  <p>Sign up with Google</p>
               </Button>
               <Button type="default" className="flex items-center gap-2">
                  <Image src="/assets/icons/facebook.png" alt="Facebook" width={20} height={20} />
                  <p>Sign up with Facebook</p>
               </Button>
            </div>
         </div>
         <Divider>OR</Divider>

         <Form.Item name="loginMethod" preserve={true}>
            <Radio.Group name="loginMethod" onChange={onChangeLoginMethod} value={valueLoginMethod}>
               <Radio value={1}>Receive a login link in your email</Radio>
               <Divider>OR</Divider>
               <Radio value={2}>Use email and password method</Radio>
            </Radio.Group>
         </Form.Item>
         <div className="flex gap-4">
            <Form.Item
               name="password"
               label="Password"
               preserve={true}
               rules={[
                  {
                     required: isPasswordRequired,
                     message: 'Please enter your password!',
                  },
                  { min: 4, message: 'Password must be at least 8 characters!' },
               ]}
            >
               <Input.Password placeholder="Enter your password" disabled={!isPasswordRequired} />
            </Form.Item>
            <Form.Item
               name="confirmPassword"
               label="Confirm Password"
               preserve={true}
               dependencies={['password']}
               rules={[
                  {
                     required: isPasswordRequired,
                     message: 'Please confirm your password!',
                  },
                  ({ getFieldValue }) => ({
                     validator(_, value) {
                        if (!isPasswordRequired) return Promise.resolve()
                        if (!value || getFieldValue('password') === value) {
                           return Promise.resolve()
                        }
                        return Promise.reject(new Error('The passwords do not match!'))
                     },
                  }),
               ]}
            >
               <Input.Password placeholder="Confirm your password" disabled={!isPasswordRequired} />
            </Form.Item>
         </div>
      </>
   )
}
