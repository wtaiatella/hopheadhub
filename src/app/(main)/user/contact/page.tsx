'use client'

import React from 'react'
import { Form, Input, Button, Card, Typography, Divider, Badge } from 'antd'
import { CheckCircleOutlined, PlusOutlined, CopyOutlined } from '@ant-design/icons'
import { message } from 'antd'

const { Title, Text } = Typography

const ContactSettingsPage = () => {
   const [emailForm] = Form.useForm()
   const [phoneForm] = Form.useForm()
   const [passwordForm] = Form.useForm()

   // Mock data - in a real app, this would come from an API or store
   const currentEmail = 'myemail@gmail.com'
   const currentPhone = '+1 45 256874'

   const handleEmailChange = (values: { email: string }) => {
      console.log('New email:', values.email)
      message.success('Verification link sent to your new email address')
   }

   const handlePhoneChange = (values: { phoneNumber: string }) => {
      console.log('New phone:', values.phoneNumber)
      message.success('SMS code sent to your new phone number')
   }

   const handlePasswordChange = (values: { newPassword: string; confirmPassword: string }) => {
      console.log('Password changed')
      message.success('Password changed successfully')
      passwordForm.resetFields()
   }

   const sendVerificationLink = () => {
      message.info('Verification link sent')
   }

   const sendSmsCode = () => {
      message.info('SMS code sent')
   }

   return (
      <div className="w-full mx-auto my-6">
         <h1 className="p-4 h-16 text-xl font-semibold">Contact Settings</h1>
         <div className="flex flex-col gap-4">
            <Card className="mb-6">
               <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Change Email</h2>
                  <Button type="text" icon={<PlusOutlined />} />
               </div>
               <Form
                  form={emailForm}
                  layout="vertical"
                  onFinish={handleEmailChange}
                  requiredMark={false}
               >
                  <div className="grid grid-cols-1 gap-4">
                     <Form.Item label="Current Email:">
                        <Input
                           value={currentEmail}
                           readOnly
                           suffix={
                              <Badge count={<CheckCircleOutlined style={{ color: '#52c41a' }} />} />
                           }
                           addonAfter={<Text type="secondary">Verified</Text>}
                        />
                     </Form.Item>

                     <Form.Item
                        name="email"
                        label="Email:"
                        rules={[
                           { required: true, message: 'Please enter your new email' },
                           { type: 'email', message: 'Please enter a valid email' },
                        ]}
                     >
                        <Input
                           placeholder="Enter again"
                           suffix={
                              <Button
                                 type="link"
                                 onClick={sendVerificationLink}
                                 className="p-0 h-auto"
                              >
                                 Send verification link
                              </Button>
                           }
                           addonAfter={<CopyOutlined />}
                        />
                     </Form.Item>
                  </div>

                  <Button
                     type="primary"
                     htmlType="submit"
                     className="bg-indigo-800 hover:bg-indigo-700"
                  >
                     Save New Email
                  </Button>
               </Form>
            </Card>

            <Card className="mb-6">
               <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Change Phone Number</h2>
                  <Button type="text" icon={<PlusOutlined />} />
               </div>
               <Form
                  form={phoneForm}
                  layout="vertical"
                  onFinish={handlePhoneChange}
                  requiredMark={false}
               >
                  <div className="grid grid-cols-1 gap-4">
                     <Form.Item label="Current Number:">
                        <Input
                           value={currentPhone}
                           readOnly
                           suffix={
                              <Badge count={<CheckCircleOutlined style={{ color: '#52c41a' }} />} />
                           }
                           addonAfter={<Text type="secondary">Verified</Text>}
                        />
                     </Form.Item>

                     <Form.Item
                        name="phoneNumber"
                        label="Phone number:"
                        rules={[{ required: true, message: 'Please enter your new phone number' }]}
                     >
                        <Input
                           placeholder="Enter again"
                           suffix={
                              <Button type="link" onClick={sendSmsCode} className="p-0 h-auto">
                                 Send SMS code
                              </Button>
                           }
                           addonAfter={<CopyOutlined />}
                        />
                     </Form.Item>
                  </div>

                  <Button
                     type="primary"
                     htmlType="submit"
                     className="bg-indigo-800 hover:bg-indigo-700"
                  >
                     Save New Phone
                  </Button>
               </Form>
            </Card>

            <Card>
               <h2 className="text-lg font-semibold">Set Password</h2>
               <Form
                  form={passwordForm}
                  layout="vertical"
                  onFinish={handlePasswordChange}
                  requiredMark={false}
               >
                  <div className="grid grid-cols-1 gap-4">
                     <Form.Item
                        name="newPassword"
                        label="New Password:"
                        rules={[
                           { required: true, message: 'Please enter your new password' },
                           { min: 8, message: 'Password must be at least 8 characters' },
                        ]}
                     >
                        <Input.Password placeholder="Enter new password" />
                     </Form.Item>

                     <Form.Item
                        name="confirmPassword"
                        label="Confirm Password:"
                        dependencies={['newPassword']}
                        rules={[
                           { required: true, message: 'Please confirm your password' },
                           ({ getFieldValue }) => ({
                              validator(_, value) {
                                 if (!value || getFieldValue('newPassword') === value) {
                                    return Promise.resolve()
                                 }
                                 return Promise.reject(new Error('The two passwords do not match'))
                              },
                           }),
                        ]}
                     >
                        <Input.Password placeholder="Enter again" />
                     </Form.Item>
                  </div>

                  <Button
                     type="primary"
                     htmlType="submit"
                     className="bg-indigo-800 hover:bg-indigo-700"
                  >
                     Set Password
                  </Button>
               </Form>
            </Card>
         </div>
      </div>
   )
}

export default ContactSettingsPage
