/*
Improvements:
- UX/UI Error-Proof Validation: Before allowing the form to be submitted, make the buttons or interactions conditional
on the `captchaVerified` state. For example, disable the submit buttons until the user has solved the captcha.
- Captcha error control: Add visual feedback on the frontend if reCAPTCHA fails or expires, to improve the user experience.
- Secure Environment (keys):** Do not expose the reCAPTCHA keys directly on the frontend (in this case, the `sitekey`).
Although the use of the `sitekey` on the frontend is necessary, avoid leaking critical information or using it
in non-secure environments.
 */

'use client'
import { getRecaptchaSiteKey } from '@/app/action/env'
import { useUserStore } from '@/stores/userStore'
import { UserSignin } from '@/types/user'
import { Button, Divider, Form, Input, Checkbox, FormInstance, message } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

const Login = () => {
   const [loginForm] = Form.useForm()
   const [captchaVerified, setCaptchaVerified] = useState(false) // State to track captcha
   const [recaptchaSiteKey, setRecaptchaSiteKey] = useState<string>('') // State for the reCAPTCHA site key
   const { signin } = useUserStore()
   const [messageApi, contextHolder] = message.useMessage()
   const router = useRouter()

   // Fetch the reCAPTCHA site key on component mount
   useEffect(() => {
      const fetchSiteKey = async () => {
         try {
            const result = await getRecaptchaSiteKey()
            if (result.success && result.siteKey) {
               setRecaptchaSiteKey(result.siteKey)
            }
         } catch (error) {
            console.error('Failed to fetch reCAPTCHA site key:', error)
         }
      }

      fetchSiteKey()
   }, [])

   // Handle reCAPTCHA verification
   const onCaptchaChange = async (value: string | null) => {
      if (value) {
         console.log('Captcha passed:', value) // Handle token as needed
         const response = await fetch('/api/validate-recaptcha', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: value }),
         })
         const data = await response.json()
         if (data.success) {
            setCaptchaVerified(true)
         }
         console.log('Captcha response:', data)
      } else {
         setCaptchaVerified(false)
      }
   }

   const onFinish = async (values: UserSignin) => {
      console.log('Received values of form: ', values)
      // Call signin from userStore
      const loginResult = await signin({ ...values })
      if (loginResult.success) {
         messageApi.success('Signin successful!')
         router.push('./')
      } else {
         messageApi.error(loginResult.error || 'Error during signin. Please try again.')
      }
   }

   interface SubmitButtonProps {
      form: FormInstance
   }

   const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({
      form,
      children,
   }) => {
      const [submittable, setSubmittable] = React.useState<boolean>(false)

      // Watch all values
      const values = Form.useWatch([], form)
      console.log('Watching values of form: ', form)
      React.useEffect(() => {
         //if (!captchaVerified) return
         form
            .validateFields({ validateOnly: true })
            .then(() => setSubmittable(true))
            .catch(() => setSubmittable(false))
      }, [form, values])

      return (
         <Button type="primary" htmlType="submit" disabled={!submittable}>
            {children}
         </Button>
      )
   }

   const handleLogin = async (loginMethod: string) => {
      console.log('Login method:', loginMethod)
   }

   return (
      <>
         {contextHolder}
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
            <div className="flex items-center justify-end mb-8">
               <a href="./" className="text-primary hover:text-primary-hover hover:underline">
                  home
               </a>
            </div>
            <h1 className="text-3xl font-bold text-primary">Welcome Back!</h1>

            <div className="bg-white p-6 mt-8 rounded-lg shadow-md">
               <div className="flex flex-wrap items-center gap-4 my-4 justify-center">
                  <Button
                     type="default"
                     className="flex items-center gap-2"
                     onClick={() => handleLogin('google')}
                     disabled={true}
                  >
                     <Image src="/assets/icons/google.png" alt="Google" width={20} height={20} />
                     <p>Login with Google</p>
                  </Button>
                  <Button
                     type="default"
                     className="flex items-center gap-2"
                     onClick={() => handleLogin('facebook')}
                     disabled={true}
                  >
                     <Image
                        src="/assets/icons/facebook.png"
                        alt="Facebook"
                        width={20}
                        height={20}
                     />
                     <p>Login with Facebook</p>
                  </Button>
               </div>
               <Divider>OR</Divider>
               <div className="my-0">
                  <Form
                     name="login"
                     layout="vertical"
                     form={loginForm}
                     preserve={true}
                     initialValues={{ remember: true }}
                     onFinish={onFinish}
                  >
                     <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                     >
                        <Input placeholder="enter your email" type="email" />
                     </Form.Item>
                     <Form.Item
                        label="Password"
                        name="password"
                        help={
                           <a
                              className="text-primary hover:text-primary-hover hover:underline block"
                              href="/forgot-password"
                           >
                              Forgot your password?
                           </a>
                        }
                        rules={[{ required: true, message: 'Please input your password!' }]}
                        style={{ marginBottom: '4px' }}
                     >
                        <Input placeholder="enter your password" type="password" />
                     </Form.Item>

                     <Divider>OR</Divider>

                     <Form.Item
                        label="Send a login link to your e-mail address"
                        name="email-link"
                        /* rules={[{ required: true, message: 'Please input your email!' }]} */
                     >
                        <Input placeholder="enter your email" type="email" disabled={true} />
                     </Form.Item>
                     <div className="my-0">
                        {recaptchaSiteKey && (
                           <ReCAPTCHA sitekey={recaptchaSiteKey} onChange={onCaptchaChange} />
                        )}
                     </div>
                     <div className="flex items-center gap-12 flex-wrap">
                        <Form.Item style={{ marginBottom: '0px' }}>
                           <SubmitButton form={loginForm}>Log in</SubmitButton>
                        </Form.Item>
                        <Form.Item
                           name="rememberMe"
                           valuePropName="checked"
                           label={null}
                           style={{ marginBottom: '0px' }}
                        >
                           <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                     </div>
                  </Form>
               </div>
            </div>
            <div className="text-center mt-2">
               <p>
                  or if you don&apos;t have a login?{' '}
                  <a
                     href="/signup"
                     className="text-primary hover:text-primary-hover hover:underline"
                  >
                     Register now!
                  </a>
               </p>
            </div>
         </div>
      </>
   )
}

export default Login
