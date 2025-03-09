'use client'
import { Form, Input, Select, DatePicker, Switch } from 'antd'
import React from 'react'

// Define interface for user information
interface UserInfo {
   name: string
   nickname?: string
   phone: string
   birthDate: Date
   city: string
   state: string
}

export default function UserInfo(): React.ReactElement {
   return (
      <>
         <Form.Item
            name="name"
            label="Full Name"
            layout="horizontal"
            preserve={true}
            rules={[{ required: true, message: 'Please enter your full name!' }]}
         >
            <Input placeholder="Enter your full name" />
         </Form.Item>

         <Form.Item
            name="nickname"
            label="Nickname"
            help="how you want to be called"
            layout="horizontal"
            preserve={true}
            rules={[{ required: true, message: 'Please enter your nickname!' }]}
         >
            <Input placeholder="Enter your nickname" />
         </Form.Item>

         <div className="grid grid-cols-2 items-center gap-4">
            <Form.Item
               name="city"
               label="City"
               preserve={true}
               rules={[{ required: true, message: 'Please enter your city!' }]}
            >
               <Input placeholder="Enter your city" />
            </Form.Item>

            <Form.Item
               name="state"
               label="State"
               preserve={true}
               rules={[{ required: true, message: 'Please select your state!' }]}
            >
               <Select
                  placeholder="Select your state"
                  options={[
                     { value: 'AL', label: 'Alabama' },
                     { value: 'AK', label: 'Alaska' },
                     { value: 'AZ', label: 'Arizona' },
                     { value: 'AR', label: 'Arkansas' },
                     { value: 'CA', label: 'California' },
                     { value: 'CO', label: 'Colorado' },
                     { value: 'CT', label: 'Connecticut' },
                     { value: 'DE', label: 'Delaware' },
                     { value: 'FL', label: 'Florida' },
                     { value: 'GA', label: 'Georgia' },
                     { value: 'HI', label: 'Hawaii' },
                     { value: 'ID', label: 'Idaho' },
                     { value: 'IL', label: 'Illinois' },
                     { value: 'IN', label: 'Indiana' },
                     { value: 'IA', label: 'Iowa' },
                     { value: 'KS', label: 'Kansas' },
                     { value: 'KY', label: 'Kentucky' },
                     { value: 'LA', label: 'Louisiana' },
                     { value: 'ME', label: 'Maine' },
                     { value: 'MD', label: 'Maryland' },
                     { value: 'MA', label: 'Massachusetts' },
                     { value: 'MI', label: 'Michigan' },
                     { value: 'MN', label: 'Minnesota' },
                     { value: 'MS', label: 'Mississippi' },
                     { value: 'MO', label: 'Missouri' },
                     { value: 'MT', label: 'Montana' },
                     { value: 'NE', label: 'Nebraska' },
                     { value: 'NV', label: 'Nevada' },
                     { value: 'NH', label: 'New Hampshire' },
                     { value: 'NJ', label: 'New Jersey' },
                     { value: 'NM', label: 'New Mexico' },
                     { value: 'NY', label: 'New York' },
                     { value: 'NC', label: 'North Carolina' },
                     { value: 'ND', label: 'North Dakota' },
                     { value: 'OH', label: 'Ohio' },
                     { value: 'OK', label: 'Oklahoma' },
                     { value: 'OR', label: 'Oregon' },
                     { value: 'PA', label: 'Pennsylvania' },
                     { value: 'RI', label: 'Rhode Island' },
                     { value: 'SC', label: 'South Carolina' },
                     { value: 'SD', label: 'South Dakota' },
                     { value: 'TN', label: 'Tennessee' },
                     { value: 'TX', label: 'Texas' },
                     { value: 'UT', label: 'Utah' },
                     { value: 'VT', label: 'Vermont' },
                     { value: 'VA', label: 'Virginia' },
                     { value: 'WA', label: 'Washington' },
                     { value: 'WV', label: 'West Virginia' },
                     { value: 'WI', label: 'Wisconsin' },
                     { value: 'WY', label: 'Wyoming' },
                  ]}
               />
            </Form.Item>
         </div>

         <Form.Item name="beerInterest" label="What is your beer interest?" preserve={true}>
            <Select
               placeholder="Select your state"
               mode="tags"
               tokenSeparators={[',']}
               options={[
                  {
                     label: <span>Enthusiastic</span>,
                     title: 'enthusiastic',
                     options: [
                        { label: <span>Tournament</span>, value: 'Tournament' },
                        { label: <span>Classes</span>, value: 'Classes' },
                        { label: <span>Beer Talk</span>, value: 'Beer Talk' },
                        { label: <span>Brew Day</span>, value: 'Brew Day' },
                        { label: <span>Tasting Session</span>, value: 'Tasting Session' },
                     ],
                  },
                  {
                     label: <span>Fun</span>,
                     title: 'fun',
                     options: [
                        { label: <span>Party</span>, value: 'Party' },
                        { label: <span>Festival</span>, value: 'Festival' },
                        { label: <span>Tour</span>, value: 'Tour' },
                        { label: <span> Beer Garden</span>, value: 'Beer Garden' },
                     ],
                  },
                  {
                     label: <span>Professional</span>,
                     title: 'professional',
                     options: [
                        { label: <span>Expo</span>, value: 'Expo' },
                        { label: <span>Workshop</span>, value: 'Workshop' },
                        { label: <span>Conference</span>, value: 'Conference' },
                        { label: <span>Networking</span>, value: 'Networking' },
                     ],
                  },
               ]}
            />
         </Form.Item>
      </>
   )
}
