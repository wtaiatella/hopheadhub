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
import { Button, Divider, Form, Input, Checkbox, FormInstance } from 'antd'
import Image from 'next/image'
import React from 'react'
import { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

export default function Login() {
   const [form] = Form.useForm()
   const [captchaVerified, setCaptchaVerified] = useState(false) // State to track captcha

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

   const onFinish = (values: any) => {
      console.log('Received values of form: ', values)
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

   return (
      <>
         <div className="flex items-center justify-center bg-[url(/assets/cheers-at-sun-set.jpeg)] bg-center bg-cover bg-no-repeat" />

         <div className="bg-background px-24 py-8">
            <div className="flex items-center justify-end mb-8">
               <a href="./">home</a>
            </div>
            <h1 className="text-4xl font-bold text-primary">Welcome Back!</h1>
            <div className="flex items-center gap-4 my-8">
               <Button type="default" className="flex items-center gap-2">
                  <Image src="/assets/icons/google.png" alt="Google" width={20} height={20} />
                  <p>Login with Google</p>
               </Button>
               <Button type="default" className="flex items-center gap-2">
                  <Image src="/assets/icons/facebook.png" alt="Facebook" width={20} height={20} />
                  <p>Login with Facebook</p>
               </Button>
            </div>
            <Divider>OR</Divider>
            <div>
               <Form
                  name="login"
                  layout="vertical"
                  form={form}
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
                     rules={[{ required: true, message: 'Please input your password!' }]}
                  >
                     <Input placeholder="enter your password" type="password" />
                  </Form.Item>
                  <Form.Item>
                     <div className="flex items-center justify-between">
                        <Form.Item name="remember" valuePropName="checked" label={null} noStyle>
                           <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <a href="/forgot-password">Forgot your password?</a>
                     </div>
                  </Form.Item>

                  <Divider>OR</Divider>
                  <Form.Item
                     label="Send a login link to your e-mail address"
                     name="email-link"
                     rules={[{ required: true, message: 'Please input your email!' }]}
                  >
                     <Input placeholder="enter your email" type="email" />
                  </Form.Item>
                  <div className="my-4">
                     <ReCAPTCHA
                        sitekey="6Lcz0uUqAAAAAE4BioyX8cNomSj33fIznJYcnWaj" // Replace with your reCAPTCHA site key
                        onChange={onCaptchaChange}
                     />
                  </div>
                  <Form.Item>
                     <SubmitButton form={form}>Submit</SubmitButton>
                     <Button block type="primary" htmlType="submit">
                        Log in
                     </Button>
                     or if you don&apos;t have a login? <a href="/signup">Register now!</a>
                  </Form.Item>
               </Form>
            </div>
         </div>
      </>
   )
}
