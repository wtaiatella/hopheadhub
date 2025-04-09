'use client'

import { Form, Input, Button, Divider, Radio, RadioChangeEvent, Tooltip } from 'antd'
import React, { useState } from 'react'
import Image from 'next/image'
import { UserCreate } from '@/types/user'

export default function LoginInfo(): React.ReactElement {
   const [valueLoginMethod, setValueLoginMethod] = useState<UserCreate['loginMethod']>('notDefined')

   const onChangeLoginMethod = (e: RadioChangeEvent) => {
      setValueLoginMethod(e.target.value)
   }

   const handleGoogle = () => {
      setValueLoginMethod('gmail')
   }

   const handleFacebook = () => {
      setValueLoginMethod('facebook')
   }

   return (
      <>
         <div className="mb-6">
            <p className="mb-4 w-full text-center text-2xl font-bold text-primary">
               Here you can choose how to sign up
            </p>
            <p className="mb-2">You can sign up using your social accounts:</p>
            <div className="flex items-center gap-4">
               <Tooltip title="Google (not available yet)">
                  <Button
                     type="default"
                     className="flex items-center gap-2"
                     onClick={handleGoogle}
                     disabled={true}
                  >
                     <Image src="/assets/icons/google.png" alt="Google" width={20} height={20} />
                     <p>Sign up with Google</p>
                  </Button>
               </Tooltip>
               <Tooltip title="Facebook (not available yet)">
                  <Button
                     type="default"
                     className="flex items-center gap-2"
                     onClick={handleFacebook}
                     disabled={true}
                  >
                     <Image
                        src="/assets/icons/facebook.png"
                        alt="Facebook"
                        width={20}
                        height={20}
                     />
                     <p>Sign up with Facebook</p>
                  </Button>
               </Tooltip>
            </div>
         </div>
         <Divider>OR</Divider>

         <Form.Item name="loginMethod" preserve={true}>
            <Radio.Group name="loginMethod" onChange={onChangeLoginMethod} value={valueLoginMethod}>
               <Tooltip title="emailLink (not available yet)">
                  <Radio value="emailLink" disabled={true}>
                     Receive a login link in your email
                  </Radio>
               </Tooltip>
               <Divider>OR</Divider>
               <Radio value="password">Use email and password method</Radio>
            </Radio.Group>
         </Form.Item>
         <div className="flex gap-4">
            <Form.Item
               name="password"
               label="Password"
               preserve={true}
               rules={[
                  {
                     required: valueLoginMethod === 'password',
                     message: 'Please enter your password!',
                  },
                  { min: 4, message: 'Password must be at least 8 characters!' },
               ]}
            >
               <Input.Password
                  placeholder="Enter your password"
                  disabled={valueLoginMethod !== 'password'}
               />
            </Form.Item>
            <Form.Item
               name="confirmPassword"
               label="Confirm Password"
               preserve={true}
               dependencies={['password']}
               rules={[
                  {
                     required: valueLoginMethod === 'password',
                     message: 'Please confirm your password!',
                  },
                  ({ getFieldValue }) => ({
                     validator(_, value) {
                        if (valueLoginMethod !== 'password') return Promise.resolve()
                        if (!value || getFieldValue('password') === value) {
                           return Promise.resolve()
                        }
                        return Promise.reject(new Error('The passwords do not match!'))
                     },
                  }),
               ]}
            >
               <Input.Password
                  placeholder="Confirm your password"
                  disabled={valueLoginMethod !== 'password'}
               />
            </Form.Item>
         </div>
      </>
   )
}
