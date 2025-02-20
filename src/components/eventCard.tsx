import { Button, Dropdown, Tooltip } from 'antd'
import type { MenuProps } from 'antd'
import { Calendar, EllipsisVertical, Heart, MapPin } from 'lucide-react'
import Image from 'next/image'

const items: MenuProps['items'] = [
   {
      key: '1',
      label: (
         <a target="_blank" rel="noopener noreferrer" href="">
            View in calendar
         </a>
      ),
   },
   {
      key: '2',
      label: (
         <a target="_blank" rel="noopener noreferrer" href="">
            Report event
         </a>
      ),
   },
]

export default function EventCard() {
   return (
      <div className="relative w-64 h-96 flex flex-col rounded-2xl overflow-hidden bg-card shadow-2xl">
         <div className="absolute top-4 right-4 z-10">
            <div className="relative">
               <Tooltip title="favorite">
                  <Button className="relative" shape="circle">
                     <Heart />
                  </Button>
               </Tooltip>
            </div>
         </div>
         <Image
            src="/assets/beer-event.jpeg"
            className="w-full h-36"
            width={5472}
            height={3648}
            alt="hhh logo"
            priority
         />
         <p className="w-full h-7 bg-primary items-center justify-center flex text-card">Fev 5</p>
         <div className="flex flex-col gap-2 items-center mt-2">
            <div className="w-full px-2 flex justify-between">
               <h1 className="h-14 font-bold text-xl items-center flex">
                  Title of the event or other thing
               </h1>
               <div className="flex items-center w-6 cursor-pointer">
                  <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight">
                     <EllipsisVertical />
                  </Dropdown>
               </div>
            </div>
            <div className="w-full px-2 flex gap-2 items-center">
               <Calendar className="w-5 h-5" />
               <div className="w-full h-full flex flex-col text-xs">
                  <p className="w-full items-center flex">Tuesday - 5th February</p>
                  <p className="w-full items-center flex">Starts at 10 p.m.</p>
               </div>
            </div>
            <div className="w-full px-2 flex gap-2 items-center">
               <MapPin className="w-5 h-5" />
               <p className="w-full items-center flex">Location Name</p>
            </div>
            <div className="w-full px-2 flex justify-center relative">
               <Button type="primary" className="w-3/6 flex items-center justify-center">
                  Book Now
               </Button>
               <span className="absolute -top-3 right-2">
                  <Image src="/assets/free.png" width={86} height={50} alt="hhh logo" />
               </span>
            </div>
            <p className="items-center flex justify-center text-xs mt-1">
               200 people are attending this event
            </p>
         </div>
      </div>
   )
}
