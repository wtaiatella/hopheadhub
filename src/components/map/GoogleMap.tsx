'use client'
import { useState, useEffect, useCallback } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { Spin } from 'antd'

interface MapProps {
   address: string
   height?: string
   width?: string
   zoom?: number
   className?: string
   apiKey?: string
}

interface GeocodingResult {
   lat: number
   lng: number
}

const MapComponent = ({
   address,
   height = '400px',
   width = '100%',
   zoom = 15,
   className = '',
   apiKey = '',
}: MapProps) => {
   const [coordinates, setCoordinates] = useState<GeocodingResult | null>(null)
   const [loading, setLoading] = useState<boolean>(true)
   const [error, setError] = useState<string | null>(null)

   // Use the API key from props or fallback to an empty string
   const googleMapsApiKey = apiKey || ''

   // Geocode the address to get coordinates
   const geocodeAddress = useCallback(
      async (address: string) => {
         try {
            setLoading(true)
            const response = await fetch(
               `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                  address
               )}&key=${googleMapsApiKey}`
            )

            const data = await response.json()

            if (data.status === 'OK' && data.results && data.results.length > 0) {
               const { lat, lng } = data.results[0].geometry.location
               setCoordinates({ lat, lng })
               setError(null)
            } else {
               setError(`Could not find coordinates for address: ${address}`)
               console.error('Geocoding error:', data.status)
            }
         } catch (err) {
            setError('Error geocoding address')
            console.error('Geocoding error:', err)
         } finally {
            setLoading(false)
         }
      },
      [googleMapsApiKey]
   )

   useEffect(() => {
      if (address) {
         geocodeAddress(address)
      }
   }, [address, geocodeAddress])

   const mapContainerStyle = {
      width,
      height,
   }

   if (error) {
      return <div className="text-red-500">{error}</div>
   }

   if (!googleMapsApiKey) {
      return (
         <div className="text-red-500">
            Google Maps API key is missing. Please provide an API key.
         </div>
      )
   }

   return (
      <div className={className}>
         {loading ? (
            <div style={mapContainerStyle} className="flex items-center justify-center bg-gray-100">
               <Spin tip="Loading map..." />
            </div>
         ) : (
            <LoadScript googleMapsApiKey={googleMapsApiKey}>
               <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={coordinates || { lat: 0, lng: 0 }}
                  zoom={zoom}
               >
                  {coordinates && <Marker position={coordinates} />}
               </GoogleMap>
            </LoadScript>
         )}
      </div>
   )
}

export default MapComponent
