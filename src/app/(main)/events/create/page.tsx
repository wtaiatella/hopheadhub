'use client'

import { useState } from 'react'
import {
   Steps,
   Button,
   Form,
   Input,
   Select,
   Radio,
   DatePicker,
   TimePicker,
   Upload,
   Card,
} from 'antd'
import { Plus, ArrowLeft } from 'lucide-react'
import Title from '@/components/commom/title'
import { EventMap } from '@/components/map'
import Link from 'next/link'

const { Step } = Steps
const { TextArea } = Input
const { Option } = Select
const { RangePicker } = DatePicker

// Event creation steps
const steps = [
   {
      title: 'Edit',
      description: 'Event details',
   },
   {
      title: 'Banner',
      description: 'Upload image',
   },
   {
      title: 'Ticketing',
      description: 'Set up tickets',
   },
   {
      title: 'Review',
      description: 'Publish event',
   },
]

// Event categories
const eventCategories = [
   'Beer Festival',
   'Brewery Tour',
   'Beer Tasting',
   'Homebrewing Workshop',
   'Beer Pairing Dinner',
   'Beer Launch',
   'Craft Beer Meetup',
]

// Location types
const locationTypes = [
   'Brewery',
   'Bar',
   'Restaurant',
   'Event Space',
   'Outdoor Venue',
   'Online',
   'Other',
]

export default function CreateEvent() {
   const [currentStep, setCurrentStep] = useState(0)
   const [form] = Form.useForm()
   const [eventType, setEventType] = useState('single')
   const [ticketType, setTicketType] = useState('free')
   const [tickets, setTickets] = useState([{ name: '', price: 0 }])

   // Handle step navigation
   const nextStep = () => {
      form.validateFields().then(() => {
         setCurrentStep(currentStep + 1)
      })
   }

   const prevStep = () => {
      setCurrentStep(currentStep - 1)
   }

   // Add a new ticket
   const addTicket = () => {
      setTickets([...tickets, { name: '', price: 0 }])
   }

   // Handle ticket name change
   const handleTicketNameChange = (index: number, value: string) => {
      const newTickets = [...tickets]
      newTickets[index].name = value
      setTickets(newTickets)
   }

   // Handle ticket price change
   const handleTicketPriceChange = (index: number, value: number) => {
      const newTickets = [...tickets]
      newTickets[index].price = value
      setTickets(newTickets)
   }

   // Render the current step content
   const renderStepContent = () => {
      switch (currentStep) {
         case 0:
            return (
               <div>
                  {/* Event Details */}
                  <div>
                     <h2 className="text-2xl font-semibold">Event Details</h2>
                     <Form.Item
                        name="eventTitle"
                        label="Event Title"
                        rules={[{ required: true, message: 'Please enter the event title' }]}
                        labelCol={{ span: 24 }}
                     >
                        <Input placeholder="Enter the name of your event" />
                     </Form.Item>

                     <Form.Item
                        name="eventCategory"
                        label="Event Category"
                        rules={[{ required: true, message: 'Please select an event category' }]}
                        labelCol={{ span: 24 }}
                     >
                        <Select
                           placeholder="Please select one"
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
                                    {
                                       label: <span>Tasting Session</span>,
                                       value: 'Tasting Session',
                                    },
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
                  </div>

                  {/* Date & Time */}
                  <div>
                     <h2 className="text-2xl font-semibold">Date & Time</h2>
                     <div className="flex flex-wrap gap-4">
                        <Form.Item
                           name="startDate"
                           label="Start Date"
                           rules={[{ required: true, message: 'Please select a start date' }]}
                           labelCol={{ span: 24 }}
                           className="flex-1 min-w-[200px]"
                        >
                           <DatePicker className="w-full" format="MM/DD/YYYY" />
                        </Form.Item>

                        <Form.Item
                           name="startTime"
                           label="Start Time"
                           rules={[{ required: true, message: 'Please select a start time' }]}
                           labelCol={{ span: 24 }}
                           className="flex-1 min-w-[200px]"
                        >
                           <TimePicker className="w-full" format="h:mm A" use12Hours />
                        </Form.Item>

                        <Form.Item
                           name="endTime"
                           label="End Time"
                           labelCol={{ span: 24 }}
                           className="flex-1 min-w-[200px]"
                        >
                           <TimePicker className="w-full" format="h:mm A" use12Hours />
                        </Form.Item>
                     </div>
                  </div>

                  {/* Location */}
                  <div>
                     <h2 className="text-2xl font-semibold">Location</h2>
                     <Form.Item
                        name="locationType"
                        label="Where will your event take place?"
                        rules={[
                           {
                              required: true,
                              message: 'Please write where your event will take place',
                           },
                        ]}
                        labelCol={{ span: 24 }}
                     >
                        <Input placeholder="Enter the place name" />
                     </Form.Item>
                     <Form.Item
                        name="addressZip"
                        label="Zip Code"
                        rules={[{ required: true, message: 'Please enter the event zip code' }]}
                        labelCol={{ span: 24 }}
                        className="w-fit"
                     >
                        <Input placeholder="Enter the zip code" />
                     </Form.Item>
                     <div className="flex items-center gap-4 w-full justify-between">
                        <Form.Item
                           name="addressStreet"
                           label="Street Address"
                           rules={[{ required: true, message: 'Please enter the event address' }]}
                           labelCol={{ span: 24 }}
                           className="flex-1"
                        >
                           <Input placeholder="Enter the street address" />
                        </Form.Item>

                        <Form.Item
                           name="addressNumber"
                           label="Address Number"
                           rules={[
                              { required: true, message: 'Please enter the event address number' },
                           ]}
                           labelCol={{ span: 24 }}
                        >
                           <Input placeholder="Enter the address number" />
                        </Form.Item>

                        <Form.Item
                           name="addressComplement"
                           label="Complement"
                           rules={[
                              { required: true, message: 'Please enter the event complement' },
                           ]}
                           labelCol={{ span: 24 }}
                        >
                           <Input placeholder="Enter the complement" />
                        </Form.Item>
                     </div>
                     <div className="flex items-center gap-4 box-border">
                        <Form.Item
                           name="addressCity"
                           label="City"
                           rules={[{ required: true, message: 'Please enter the event city' }]}
                           labelCol={{ span: 24 }}
                        >
                           <Input placeholder="Enter the city" />
                        </Form.Item>

                        <Form.Item
                           name="addressState"
                           label="State"
                           rules={[{ required: true, message: 'Please enter the event state' }]}
                           labelCol={{ span: 24 }}
                        >
                           <Input placeholder="Enter the state" />
                        </Form.Item>

                        <Form.Item
                           name="addressCountry"
                           label="Country"
                           rules={[{ required: true, message: 'Please enter the event country' }]}
                           labelCol={{ span: 24 }}
                        >
                           <Input placeholder="Enter the country" />
                        </Form.Item>
                     </div>
                  </div>

                  {/* Additional Information */}
                  <div>
                     <h2 className="text-2xl font-semibold">Additional Information</h2>
                     <Form.Item
                        name="eventDescription"
                        label="Event Description"
                        rules={[{ required: true, message: 'Please enter the event description' }]}
                        labelCol={{ span: 24 }}
                     >
                        <TextArea
                           placeholder="Describe what's special about your event & other important details."
                           rows={6}
                        />
                     </Form.Item>
                  </div>
               </div>
            )
         case 1:
            return (
               <div className="space-y-8">
                  <h2 className="text-2xl font-semibold">Upload Image</h2>
                  <Form.Item
                     name="eventImage"
                     labelCol={{ span: 24 }}
                     extra="Feature Image must be at least 1170 pixels wide by 504 pixels high. Valid file formats: JPG, GIF, PNG."
                  >
                     <Upload
                        listType="picture-card"
                        maxCount={1}
                        beforeUpload={() => false}
                        accept=".jpg,.jpeg,.png,.gif"
                     >
                        <div>
                           <Plus />
                           <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                     </Upload>
                  </Form.Item>
               </div>
            )
         case 2:
            return (
               <div className="space-y-8">
                  <h2 className="text-2xl font-semibold">What type of event are you running?</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <Card
                        hoverable
                        className={`border-2 ${
                           ticketType === 'ticketed' ? 'border-primary' : 'border-gray-2'
                        }`}
                        onClick={() => setTicketType('ticketed')}
                     >
                        <div className="flex flex-col items-center justify-center p-4">
                           <div className="text-4xl mb-4">🎟️</div>
                           <h3 className="text-lg font-medium">Ticketed Event</h3>
                           <p className="text-gray-500 text-center">
                              My event requires tickets for entry
                           </p>
                        </div>
                     </Card>

                     <Card
                        hoverable
                        className={`border-2 ${
                           ticketType === 'free' ? 'border-blue-500' : 'border-gray-200'
                        }`}
                        onClick={() => setTicketType('free')}
                     >
                        <div className="flex flex-col items-center justify-center p-4">
                           <div className="text-4xl mb-4">🆓</div>
                           <h3 className="text-lg font-medium">Free Event</h3>
                           <p className="text-gray-500 text-center">I'm running a free event</p>
                        </div>
                     </Card>
                  </div>

                  {ticketType === 'ticketed' && (
                     <div className="space-y-4 mt-8">
                        <h2 className="text-2xl font-semibold">What tickets are you selling?</h2>
                        {tickets.map((ticket, index) => (
                           <div key={index} className="flex flex-wrap gap-4 items-end">
                              <Form.Item
                                 label="Ticket Name"
                                 labelCol={{ span: 24 }}
                                 className="flex-1 min-w-[200px]"
                              >
                                 <Input
                                    placeholder="Ticket Name e.g. General Admission"
                                    value={ticket.name}
                                    onChange={e => handleTicketNameChange(index, e.target.value)}
                                 />
                              </Form.Item>
                              <Form.Item
                                 label="Ticket Price"
                                 labelCol={{ span: 24 }}
                                 className="flex-1 min-w-[200px]"
                              >
                                 <Input
                                    type="number"
                                    min={0}
                                    addonBefore="$"
                                    value={ticket.price}
                                    onChange={e =>
                                       handleTicketPriceChange(index, Number(e.target.value))
                                    }
                                 />
                              </Form.Item>
                           </div>
                        ))}
                        <Button
                           type="dashed"
                           onClick={addTicket}
                           icon={<Plus />}
                           className="w-full"
                        >
                           Add Ticket Type
                        </Button>
                     </div>
                  )}
               </div>
            )
         case 3:
            return (
               <div className="space-y-8">
                  <h2 className="text-2xl font-semibold">
                     Nearly there! Check everything's correct.
                  </h2>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                     <div className="bg-gray-200 h-48 flex items-center justify-center">
                        <div className="text-gray-400 text-6xl">🖼️</div>
                     </div>
                     <div className="p-6 space-y-6">
                        <h1 className="text-2xl font-bold">
                           {form.getFieldValue('eventTitle') || 'Event Title'}
                        </h1>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div>
                              <h3 className="font-semibold mb-2">Date and Time</h3>
                              <div className="flex items-center gap-2 text-gray-600">
                                 <span>📅</span>
                                 <span>
                                    {form.getFieldValue('startDate')
                                       ? form.getFieldValue('startDate').format('MMM D, YYYY')
                                       : 'Date'}
                                 </span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-600">
                                 <span>⏰</span>
                                 <span>
                                    {form.getFieldValue('startTime')
                                       ? form.getFieldValue('startTime').format('h:mm A')
                                       : 'Time'}
                                 </span>
                              </div>
                              <div className="mt-2">
                                 <button className="text-blue-500 text-sm flex items-center gap-1">
                                    <span>+</span> Add to Calendar
                                 </button>
                              </div>
                           </div>

                           {ticketType === 'ticketed' && (
                              <div>
                                 <h3 className="font-semibold mb-2">Ticket Information</h3>
                                 <div className="flex items-center gap-2 text-gray-600">
                                    <span>🎟️</span>
                                    <span>
                                       Ticket Type:{' '}
                                       {tickets.map(t => t.name || 'Ticket').join(', ')}
                                    </span>
                                 </div>
                                 <div className="flex items-center gap-2 text-gray-600">
                                    <span>💰</span>
                                    <span>Price: {tickets.map(t => `$${t.price}`).join(', ')}</span>
                                 </div>
                              </div>
                           )}
                        </div>

                        <div>
                           <h3 className="font-semibold mb-2">Location</h3>
                           <div className="flex items-center gap-2 text-gray-600 mb-2">
                              <span>📍</span>
                              <span>{form.getFieldValue('address') || 'Address'}</span>
                           </div>
                           <div className="h-32 bg-gray-200 rounded relative">
                              {form.getFieldValue('address') && (
                                 <EventMap
                                    locations={[{ address: form.getFieldValue('address') }]}
                                    height="100%"
                                    zoom={14}
                                 />
                              )}
                           </div>
                        </div>

                        <div>
                           <h3 className="font-semibold mb-2">Hosted by</h3>
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gray-200 rounded"></div>
                              <div>
                                 <div>Host Name</div>
                                 <div className="flex gap-2 mt-1">
                                    <button className="bg-gray-200 text-xs px-2 py-1 rounded">
                                       Contact
                                    </button>
                                    <button className="bg-blue-900 text-white text-xs px-2 py-1 rounded">
                                       + Follow
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </div>

                        <div>
                           <h3 className="font-semibold mb-2">Event Description</h3>
                           <p className="text-gray-600">
                              {form.getFieldValue('eventDescription') ||
                                 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus facilisis diam at enim venenatis.'}
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            )
         default:
            return null
      }
   }

   return (
      <div className="container py-8 my-header">
         <div className="flex items-center mb-8">
            <Link href="/events" className="mr-4">
               <ArrowLeft className="text-lg" />
            </Link>
            <Title>Create a New Event</Title>
         </div>

         <Steps current={currentStep} items={steps} style={{ marginBottom: '2rem' }} />
         <div className="max-w-4xl mx-auto">
            <Form
               form={form}
               layout="vertical"
               initialValues={{ eventType: 'single', ticketType: 'free' }}
            >
               {renderStepContent()}

               <div className="flex justify-between mt-8">
                  {currentStep > 0 && <Button onClick={prevStep}>Back</Button>}
                  {currentStep < steps.length - 1 ? (
                     <Button type="primary" onClick={nextStep} className="ml-auto">
                        Save & Continue
                     </Button>
                  ) : (
                     <div className="ml-auto space-x-4">
                        <Button>Save for Later</Button>
                        <Button type="primary">Publish Event</Button>
                     </div>
                  )}
               </div>
            </Form>
         </div>
      </div>
   )
}
