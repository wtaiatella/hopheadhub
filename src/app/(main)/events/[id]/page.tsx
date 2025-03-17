import Image from 'next/image'
import { Button } from 'antd'
import { Tooltip } from 'antd'
import { CalendarDays, Clock, Heart, Share2 } from 'lucide-react'
import {
   FacebookIcon,
   XTwiterIcon,
   WhatsAppIcon,
   TicketIcon,
   InstagramIcon,
   MapIcon,
} from '@/components/icons'
import Title from '@/components/commom/title'
import { MapWrapper } from '@/components/map'

export default function Events() {
   // Example address - you would typically get this from your event data
   const eventAddress = '3912 Main St, Flushing, NY 11354, USA'

   return (
      <main className="container mt-header">
         <div className="pt-4">
            <Image
               className="rounded-2xl object-cover w-full h-96"
               width={1200}
               height={300}
               src="/assets/event-beer-party.jpeg"
               alt="events Image"
            />
         </div>

         <div className="flex items-center justify-between">
            <Title className="text-5xl mt-8">Event Title</Title>
            <div className="flex items-center gap-2">
               <Tooltip title="favorite">
                  <Button type="text" shape="circle">
                     <Heart size={36} color="var(--primary)" />
                  </Button>
               </Tooltip>
               <Tooltip title="share">
                  <Button type="text" shape="circle">
                     <Share2 size={36} color="var(--primary)" />
                  </Button>
               </Tooltip>
            </div>
         </div>

         <div className="flex hidden items-center gap-2">
            <Tooltip title="instagram">
               <Button type="text" shape="circle">
                  <InstagramIcon size={24} color="var(--primary)" />
               </Button>
            </Tooltip>
            <Tooltip title="whatsapp">
               <Button type="text" shape="circle">
                  <WhatsAppIcon size={24} color="var(--primary)" />
               </Button>
            </Tooltip>
            <Tooltip title="whatsapp">
               <Button type="text" shape="circle">
                  <XTwiterIcon size={24} color="var(--primary)" />
               </Button>
            </Tooltip>
            <Tooltip title="facebook">
               <Button type="text" shape="circle">
                  <FacebookIcon size={24} color="var(--primary)" />
               </Button>
            </Tooltip>
         </div>

         <div className="flex items-center justify-between mt-8">
            <div className="flex flex-col">
               <h2 className="text-2xl font-semibold text-primary mb-2">Date and time</h2>
               <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-4">
                     <CalendarDays />
                     <p>Saturday - 5th February</p>
                  </div>
                  <div className="flex items-center gap-4">
                     <Clock />
                     <p>Starts at 10 p.m.</p>
                  </div>
                  <Button type="text">+ Add to calendar</Button>
               </div>
            </div>
            <div>
               <h2 className="text-2xl font-semibold text-primary mb-2">Ticket price</h2>
               <div className="flex items-center gap-4 mb-2">
                  <TicketIcon size={24} color="var(--primary)" />
                  <p>Standart Ticket:</p>
                  <span>Free</span>
               </div>
               <Button type="primary">Buy ticket</Button>
            </div>
         </div>

         <div className="mt-8">
            <h2 className="text-2xl font-semibold text-primary">Location</h2>

            <div className="flex items-center gap-4">
               <MapIcon />
               <div>
                  <p>Location Name</p>
                  <p>189 Address</p>
                  <p>City, State, Zip</p>
               </div>
            </div>
         </div>
         <div className="mt-8">
            <MapWrapper
               address={eventAddress}
               height="400px"
               className="rounded-lg border border-gray-200 overflow-hidden"
            />
         </div>
         <div className="mt-8">Event description</div>
      </main>
   )
}
