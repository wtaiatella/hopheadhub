'use client'

import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Upload, message, Card } from 'antd'
import { CameraOutlined, LoadingOutlined } from '@ant-design/icons'
import type { RcFile, UploadProps } from 'antd/es/upload/interface'
import { useUserStore } from '@/stores/userStore'
import { User } from '@/types/user'
import ImgCrop from 'antd-img-crop'

const AccountPage = () => {
   const [form] = Form.useForm()
   const [editingProfile, setEditingProfile] = useState(false)
   const [editingContact, setEditingContact] = useState(false)
   const [imageUrl, setImageUrl] = useState<string>('')

   // Get user and methods from the store
   const { user, isLoading, uploadAvatar, fetchCurrentUser } = useUserStore()

   // Initial form data based on user state
   const [formData, setFormData] = useState<Partial<User>>({})

   // Load user data and initialize form
   useEffect(() => {
      const loadUserData = async () => {
         // Fetch current user if not already available
         if (!user) {
            await fetchCurrentUser()
         }

         const currentUser = user || useUserStore.getState().user

         if (currentUser && !isLoading) {
            // Create form data object
            const userData = {
               id: currentUser.id,
               name: currentUser.name,
               nickname: currentUser.nickname,
               website: currentUser.website,
               company: currentUser.company,
               city: currentUser.city,
               state: currentUser.state,
               beerInterests: currentUser.beerInterests,
               profileImage: currentUser.profileImage,
            }

            setImageUrl(userData.profileImage)

            // Update form state
            setFormData(userData)

            // Set form values directly
            form.setFieldsValue(userData)
         }
      }

      loadUserData()
   }, [user, fetchCurrentUser, form, isLoading])

   const handleUploadImage: UploadProps['customRequest'] = async ({ file, onSuccess, onError }) => {
      if (!(file instanceof File)) {
         console.error('File is not a File instance')
         return
      }

      try {
         // Clear the image while uploading
         setImageUrl('')

         if (!user) {
            throw new Error('User not authenticated')
         }

         console.log('Uploading avatar for user:', user.id)
         const result = await uploadAvatar(file)

         if (result.success) {
            console.log('Avatar uploaded successfully')
            onSuccess?.('ok')
            message.success('Avatar uploaded successfully')

            if (user.profileImage) {
               const cacheBuster = `?t=${Date.now()}`
               setImageUrl(`${user.profileImage}${cacheBuster}`)
            }
         } else {
            console.error('Upload failed with error:', result.error)
            onError?.(new Error(result.error || 'Failed to upload avatar'))
            message.error(result.error || 'Failed to upload avatar')
         }
      } catch (error) {
         console.error('Error in custom request:', error)
         onError?.(error as Error)
         message.error(
            error instanceof Error ? error.message : 'Failed to upload avatar. Please try again.'
         )
      }
   }

   const onFinish = async (values: any) => {
      try {
         const updateData = {
            name: values.name,
            nickname: values.nickname,
            website: values.website || undefined,
            company: values.company || undefined,
            city: values.city,
            state: values.state,
            beerInterests: values.beerInterests || [],
            profileImage: values.profileImage || undefined,
            // Add other fields as needed
         }

         const { success, error } = await useUserStore.getState().updateProfile(updateData)

         if (!success) {
            throw new Error(error)
         }

         message.success('Profile saved successfully!')
      } catch (error) {
         console.error('Error saving profile:', error)
         message.error(
            error instanceof Error ? error.message : 'Failed to save profile. Please try again.'
         )
      }
   }

   const uploadButton = <div>{isLoading ? <LoadingOutlined /> : <CameraOutlined />}</div>

   return (
      <div className="w-full my-6">
         <h1 className="p-4 h-16 text-xl font-semibold">Account Information</h1>

         <div className="flex flex-col gap-4">
            <Card className="mb-6">
               <h2 className="text-lg font-semibold">Profile Photo</h2>
               <div className="flex justify-center">
                  <div className="custom-avatar-uploader">
                     <ImgCrop rotationSlider>
                        <Upload
                           name="avatar"
                           maxCount={1}
                           listType="picture-card"
                           showUploadList={false}
                           customRequest={handleUploadImage}
                        >
                           {imageUrl ? (
                              <img
                                 src={imageUrl}
                                 alt="avatar"
                                 style={{ width: '100%' }}
                                 className="rounded-2xl p-2"
                              />
                           ) : (
                              uploadButton
                           )}
                        </Upload>
                     </ImgCrop>
                  </div>
               </div>
            </Card>
            <Form
               form={form}
               layout="vertical"
               initialValues={formData}
               onFinish={onFinish}
               requiredMark={false}
               className="flex flex-col gap-4"
            >
               <Card
                  className="mb-6"
                  extra={
                     <Button type="link" onClick={() => setEditingProfile(!editingProfile)}>
                        {editingProfile ? 'Done' : 'Edit'}
                     </Button>
                  }
                  title="Profile Information"
               >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <Form.Item
                        name="name"
                        label="Full Name"
                        rules={[{ required: true, message: 'Please enter your full name' }]}
                     >
                        <Input placeholder="Enter full name" disabled={!editingProfile} />
                     </Form.Item>

                     <Form.Item name="nickname" label="Nickname">
                        <Input placeholder="Enter your Nickname" disabled={!editingProfile} />
                     </Form.Item>

                     <Form.Item name="website" label="Website">
                        <Input placeholder="Enter website" disabled={!editingProfile} />
                     </Form.Item>

                     <Form.Item name="company" label="Company">
                        <Input placeholder="Enter company name" disabled={!editingProfile} />
                     </Form.Item>
                  </div>
               </Card>

               <Card
                  className="mb-6"
                  extra={
                     <Button type="link" onClick={() => setEditingContact(!editingContact)}>
                        {editingContact ? 'Done' : 'Edit'}
                     </Button>
                  }
                  title="Contact Details"
               >
                  <p className="block mb-4">
                     These details are private and only used to contact you for ticketing or prizes.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <Form.Item name="phoneNumber" label="Phone Number">
                        <Input placeholder="Enter phone number" disabled={!editingContact} />
                     </Form.Item>

                     <Form.Item name="city" label="City">
                        <Input placeholder="Enter city" disabled={!editingContact} />
                     </Form.Item>

                     <Form.Item name="state" label="State">
                        <Input placeholder="Enter country" disabled={!editingContact} />
                     </Form.Item>

                     <Form.Item name="beerInterests" label="Beer interests">
                        <Input
                           placeholder="Select your beer interest (same select in register page)"
                           disabled={!editingContact}
                        />
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
      </div>
   )
}

export default AccountPage
