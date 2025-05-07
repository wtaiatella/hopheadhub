'use client'

import React, { useState } from 'react'
import { Table, Button, Tag, Space, Typography, Card, Input, Select, DatePicker, Badge } from 'antd'
import { SearchOutlined, EyeOutlined, CloseOutlined, DownloadOutlined } from '@ant-design/icons'
import type { TableProps } from 'antd/es/table'
import { useRouter } from 'next/navigation'

const { Title } = Typography
const { RangePicker } = DatePicker
const { Option } = Select

interface Booking {
   id: string
   eventTitle: string
   eventDate: string
   ticketType: string
   quantity: number
   totalPrice: number
   status: 'confirmed' | 'pending' | 'canceled'
   ticketUrl?: string
}

// Mock data - in a real app, this would come from an API or store
const mockBookings: Booking[] = [
   {
      id: '1',
      eventTitle: 'Craft Beer Festival',
      eventDate: '2025-04-15',
      ticketType: 'VIP Pass',
      quantity: 2,
      totalPrice: 120,
      status: 'confirmed',
      ticketUrl: '/tickets/ticket-1.pdf',
   },
   {
      id: '2',
      eventTitle: 'IPA Tasting Night',
      eventDate: '2025-03-10',
      ticketType: 'Standard Entry',
      quantity: 1,
      totalPrice: 25,
      status: 'confirmed',
      ticketUrl: '/tickets/ticket-2.pdf',
   },
   {
      id: '3',
      eventTitle: 'Stout Appreciation Day',
      eventDate: '2025-05-22',
      ticketType: 'Early Bird',
      quantity: 3,
      totalPrice: 60,
      status: 'pending',
   },
   {
      id: '4',
      eventTitle: 'Beer & Food Pairing',
      eventDate: '2025-04-30',
      ticketType: 'Premium Package',
      quantity: 2,
      totalPrice: 90,
      status: 'canceled',
   },
]

const MyBookingsPage = () => {
   const [searchText, setSearchText] = useState('')
   const [statusFilter, setStatusFilter] = useState<string | null>(null)
   const [dateRange, setDateRange] = useState<[string, string] | null>(null)
   const router = useRouter()

   const handleViewEvent = (id: string) => {
      router.push(`/events/${id}`)
   }

   const handleCancelBooking = (id: string) => {
      console.log('Cancel booking:', id)
      // In a real app, this would call an API to cancel the booking
   }

   const handleDownloadTicket = (url: string) => {
      console.log('Download ticket:', url)
      // In a real app, this would trigger a download
   }

   const getStatusColor = (status: string) => {
      switch (status) {
         case 'confirmed':
            return 'green'
         case 'pending':
            return 'gold'
         case 'canceled':
            return 'red'
         default:
            return 'blue'
      }
   }

   const columns: TableProps<Booking>['columns'] = [
      {
         title: 'Event',
         dataIndex: 'eventTitle',
         key: 'eventTitle',
         sorter: (a, b) => a.eventTitle.localeCompare(b.eventTitle),
      },
      {
         title: 'Date',
         dataIndex: 'eventDate',
         key: 'eventDate',
         sorter: (a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime(),
         render: date => new Date(date).toLocaleDateString(),
      },
      {
         title: 'Ticket Type',
         dataIndex: 'ticketType',
         key: 'ticketType',
      },
      {
         title: 'Quantity',
         dataIndex: 'quantity',
         key: 'quantity',
         sorter: (a, b) => a.quantity - b.quantity,
      },
      {
         title: 'Total Price',
         dataIndex: 'totalPrice',
         key: 'totalPrice',
         sorter: (a, b) => a.totalPrice - b.totalPrice,
         render: price => `$${price.toFixed(2)}`,
      },
      {
         title: 'Status',
         dataIndex: 'status',
         key: 'status',
         render: status => (
            <Tag color={getStatusColor(status)}>
               {status.charAt(0).toUpperCase() + status.slice(1)}
            </Tag>
         ),
         filters: [
            { text: 'Confirmed', value: 'confirmed' },
            { text: 'Pending', value: 'pending' },
            { text: 'Canceled', value: 'canceled' },
         ],
         onFilter: (value, record) => record.status === value,
      },
      {
         title: 'Actions',
         key: 'actions',
         render: (_, record) => (
            <Space size="small">
               <Button
                  type="text"
                  icon={<EyeOutlined />}
                  onClick={() => handleViewEvent(record.id)}
                  title="View Event"
               />
               {record.status !== 'canceled' && (
                  <Button
                     type="text"
                     danger
                     icon={<CloseOutlined />}
                     onClick={() => handleCancelBooking(record.id)}
                     title="Cancel Booking"
                  />
               )}
               {record.status === 'confirmed' && record.ticketUrl && (
                  <Button
                     type="text"
                     icon={<DownloadOutlined />}
                     onClick={() => handleDownloadTicket(record.ticketUrl!)}
                     title="Download Ticket"
                  />
               )}
            </Space>
         ),
      },
   ]

   // Filter bookings based on search text
   const filteredBookings = mockBookings.filter(booking => {
      const matchesSearch = searchText
         ? booking.eventTitle.toLowerCase().includes(searchText.toLowerCase()) ||
           booking.ticketType.toLowerCase().includes(searchText.toLowerCase())
         : true

      const matchesStatus = statusFilter ? booking.status === statusFilter : true

      const matchesDateRange = dateRange
         ? new Date(booking.eventDate) >= new Date(dateRange[0]) &&
           new Date(booking.eventDate) <= new Date(dateRange[1])
         : true

      return matchesSearch && matchesStatus && matchesDateRange
   })

   return (
      <div className="w-full mx-auto my-6">
         <div className="flex justify-between items-center p-4 h-16">
            <h2 className="text-xl font-semibold">My Bookings</h2>
         </div>

         <Card className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
               <Input
                  placeholder="Search bookings"
                  prefix={<SearchOutlined />}
                  value={searchText}
                  onChange={e => setSearchText(e.target.value)}
               />
               <Select
                  placeholder="Filter by status"
                  allowClear
                  style={{ width: '100%' }}
                  onChange={value => setStatusFilter(value)}
               >
                  <Option value="confirmed">Confirmed</Option>
                  <Option value="pending">Pending</Option>
                  <Option value="canceled">Canceled</Option>
               </Select>
               <RangePicker
                  style={{ width: '100%' }}
                  onChange={dates => {
                     if (dates) {
                        setDateRange([
                           dates[0]!.format('YYYY-MM-DD'),
                           dates[1]!.format('YYYY-MM-DD'),
                        ])
                     } else {
                        setDateRange(null)
                     }
                  }}
               />
            </div>

            <Table
               columns={columns}
               dataSource={filteredBookings}
               rowKey="id"
               pagination={{ pageSize: 10 }}
               expandable={{
                  expandedRowRender: record => (
                     <div className="p-4">
                        <p className="mb-2">
                           <strong>Booking ID:</strong> {record.id}
                        </p>
                        <p className="mb-2">
                           <strong>Purchase Date:</strong> {new Date().toLocaleDateString()}
                        </p>
                        {record.status === 'confirmed' && (
                           <p className="mb-0">
                              <strong>Ticket Status:</strong>{' '}
                              <Badge status="success" text="Ready for use" />
                           </p>
                        )}
                        {record.status === 'pending' && (
                           <p className="mb-0">
                              <strong>Payment Status:</strong>{' '}
                              <Badge status="warning" text="Awaiting payment confirmation" />
                           </p>
                        )}
                     </div>
                  ),
               }}
            />
         </Card>
      </div>
   )
}

export default MyBookingsPage
