'use client'
import { AutoComplete, Button, DatePicker, Dropdown, Input, Space } from 'antd'
import type { MenuProps } from 'antd'
import type { DatePickerProps } from 'antd'
import { ArrowDownWideNarrow, ChevronDown, MapPin, SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'
import '@/app/globals.css'

export default function SearchSection() {
   const [value, setValue] = useState('')
   const onChange = (data: string) => {
      setValue(data)
   }

   const dropdownDateItems: MenuProps['items'] = [
      {
         label: (
            <a href="https://www.antgroup.com" target="_blank" rel="noopener noreferrer">
               1st menu item
            </a>
         ),
         key: '0',
      },
      {
         label: (
            <a href="https://www.aliyun.com" target="_blank" rel="noopener noreferrer">
               2nd menu item
            </a>
         ),
         key: '1',
      },
      {
         type: 'divider',
      },
      {
         label: '3rd menu item',
         key: '3',
      },
   ]

   const onChangeDatePicker: DatePickerProps['onChange'] = (date, dateString) => {
      console.log(date, dateString)
   }

   return (
      <section className="container">
         <h1 className="text-3xl font-semibold text-primary mt-10">Explore events</h1>
         <div className="flex w-full items-center justify-between mt-4 gap-8">
            <AutoComplete
               value={value}
               options={[]}
               style={{ width: '100%' }}
               onSelect={onChange}
               onSearch={onChange}
               onChange={onChange}
               placeholder="Search events, partys, classes and more..."
               allowClear
            />
            <div className="flex items-center border-b-2 border-primary">
               <AutoComplete
                  value={value}
                  options={[]}
                  style={{ minWidth: 200 }}
                  onSelect={onChange}
                  onSearch={onChange}
                  onChange={onChange}
                  placeholder="Search City"
                  variant="borderless"
               />
               <MapPin className="w-5 h-5" />
            </div>
            <div className="flex items-center border-b-2 border-primary w-min-48">
               <Dropdown
                  className="cursor-pointer min-w-48"
                  menu={{ items: dropdownDateItems }}
                  trigger={['click']}
               >
                  <p className="w-full flex items-center justify-between">
                     This weekend
                     <ChevronDown />
                  </p>
               </Dropdown>
               <DatePicker
                  className="custom-datepicker cursor-pointer"
                  allowClear={false}
                  inputReadOnly={true}
                  placement="bottomRight"
                  onChange={onChangeDatePicker}
                  variant="borderless"
               />
            </div>
         </div>
      </section>
   )
}
