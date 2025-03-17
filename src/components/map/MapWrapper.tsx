'use server'
import MapComponent from './GoogleMap'

interface MapWrapperProps {
   address: string
   height?: string
   width?: string
   zoom?: number
   className?: string
}

export default async function MapWrapper({
   address,
   height,
   width,
   zoom,
   className,
}: MapWrapperProps) {
   // Access environment variable on the server
   const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
   console.log('API Key:', apiKey)
   return (
      <MapComponent
         address={address}
         height={height}
         width={width}
         zoom={zoom}
         className={className}
         apiKey={apiKey}
      />
   )
}
