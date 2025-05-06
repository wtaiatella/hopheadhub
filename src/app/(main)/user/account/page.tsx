'use client'

import React, { useState } from 'react'
import { Form, Input, Button, Upload, message, Card, Typography, Divider } from 'antd'
import { CameraOutlined, LoadingOutlined } from '@ant-design/icons'
import type { UploadChangeParam } from 'antd/es/upload'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'

const { Title, Text } = Typography

// Mock user data - in a real app, this would come from an API or store
const initialUserData = {
   fullName: '',
   nickname: '',
   website: '',
   company: '',
   phoneNumber: '',
   city: '',
   state: '',
   beerInterest: '',
}

const AccountPage = () => {
   const [form] = Form.useForm()
   const [loading, setLoading] = useState(false)
   const [imageUrl, setImageUrl] = useState<string>()

   const getBase64 = (img: RcFile, callback: (url: string) => void) => {
      const reader = new FileReader()
      reader.addEventListener('load', () => callback(reader.result as string))
      reader.readAsDataURL(img)
   }

   const beforeUpload = (file: RcFile) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
         message.error('You can only upload JPG/PNG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
         message.error('Image must be smaller than 2MB!')
      }
      return isJpgOrPng && isLt2M
   }

   const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
      if (info.file.status === 'uploading') {
         setLoading(true)
         return
      }
      if (info.file.status === 'done') {
         // Get this url from response in real world
         getBase64(info.file.originFileObj as RcFile, url => {
            setLoading(false)
            setImageUrl(url)
         })
      }
   }

   const onFinish = (values: typeof initialUserData) => {
      console.log('Form values:', values)
      message.success('Profile saved successfully!')
   }

   const uploadButton = <div>{loading ? <LoadingOutlined /> : <CameraOutlined />}</div>

   return (
      <div className="w-full">
         <Title level={2}>Account Information</Title>

         <Form
            form={form}
            layout="vertical"
            initialValues={initialUserData}
            onFinish={onFinish}
            requiredMark={false}
         >
            <Card className="mb-6">
               <Title level={4}>Profile Photo</Title>
               <div className="flex justify-center">
                  <Upload
                     name="avatar"
                     listType="picture-circle"
                     className="avatar-uploader"
                     showUploadList={false}
                     action="/api/upload" // Replace with your upload endpoint
                     beforeUpload={beforeUpload}
                     onChange={handleChange}
                  >
                     {imageUrl ? (
                        <img
                           src={imageUrl}
                           alt="avatar"
                           style={{ width: '100%' }}
                           className="rounded-full"
                        />
                     ) : (
                        uploadButton
                     )}
                  </Upload>
               </div>
            </Card>

            <Card className="mb-6">
               <Title level={4}>Profile Information</Title>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item
                     name="fullName"
                     label="Full Name"
                     rules={[{ required: true, message: 'Please enter your full name' }]}
                  >
                     <Input placeholder="Enter full name" />
                  </Form.Item>

                  <Form.Item name="nickname" label="Nickname">
                     <Input placeholder="Enter your Nickname" />
                  </Form.Item>

                  <Form.Item name="website" label="Website">
                     <Input placeholder="Enter website" />
                  </Form.Item>

                  <Form.Item name="company" label="Company">
                     <Input placeholder="Enter company name" />
                  </Form.Item>
               </div>
            </Card>

            <Card className="mb-6">
               <Title level={4}>Contact Details</Title>
               <Text type="secondary" className="block mb-4">
                  These details are private and only used to contact you for ticketing or prizes.
               </Text>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item name="phoneNumber" label="Phone Number">
                     <Input placeholder="Enter phone number" />
                  </Form.Item>

                  <Form.Item name="city" label="City">
                     <Input placeholder="Enter city" />
                  </Form.Item>

                  <Form.Item name="state" label="State">
                     <Input placeholder="Enter country" />
                  </Form.Item>

                  <Form.Item name="beerInterest" label="Beer interest">
                     <Input placeholder="Select your beer interest (same select in register page)" />
                  </Form.Item>
               </div>
            </Card>

            <div className="flex justify-start">
               <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className="bg-indigo-800 hover:bg-indigo-700"
               >
                  Save My Profile
               </Button>
            </div>
         </Form>
      </div>
   )
}

export default AccountPage
