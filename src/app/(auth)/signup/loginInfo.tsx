'use client'

import { Form, Input, Button, Divider } from 'antd'
import React from 'react'
import Image from 'next/image'

// Define interface for login information
interface LoginInfo {
   email: string
   password: string
   confirmPassword: string
}

export default function LoginInfo(): React.ReactElement {
   return (
      <>
         <div className="mb-8">
            <p className="text-lg mb-4">Here you can choose how to sign up</p>
            <p className="text-lg mb-4">You can sign up using your social accounts:</p>
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
            <Divider>OR</Divider>
         </div>
         <Form.Item
            name="email"
            label="Email"
            preserve={true}
            rules={[
               { required: true, message: 'Please enter your email!' },
               { type: 'email', message: 'Please enter a valid email!' },
            ]}
         >
            <Input placeholder="Enter your email" />
         </Form.Item>
         <Form.Item
            name="password"
            label="Password"
            preserve={true}
            rules={[
               { required: true, message: 'Please enter your password!' },
               { min: 8, message: 'Password must be at least 8 characters!' },
            ]}
         >
            <Input.Password placeholder="Enter your password" />
         </Form.Item>
         <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            preserve={true}
            dependencies={['password']}
            rules={[
               { required: true, message: 'Please confirm your password!' },
               ({ getFieldValue }) => ({
                  validator(_, value) {
                     if (!value || getFieldValue('password') === value) {
                        return Promise.resolve()
                     }
                     return Promise.reject(new Error('The passwords do not match!'))
                  },
               }),
            ]}
         >
            <Input.Password placeholder="Confirm your password" />
         </Form.Item>
      </>
   )
}
