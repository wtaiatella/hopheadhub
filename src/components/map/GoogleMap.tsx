'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import { GoogleMap, LoadScript, useJsApiLoader, Libraries } from '@react-google-maps/api'
import { Spin } from 'antd'
import { getGoogleMapsApiKey } from '@/app/action/env'

interface MapProps {
   address: string
   height?: string
   width?: string
   zoom?: number
   className?: string
}

interface GeocodingResult {
   lat: number
   lng: number
}

// Libraries we need to load
const libraries: Libraries = ['places']

const EventMap = ({
   address,
   height = '400px',
   width = '100%',
   zoom = 15,
   className = '',
}: MapProps) => {
   const [coordinates, setCoordinates] = useState<GeocodingResult | null>(null)
   const [loading, setLoading] = useState<boolean>(true)
   const [error, setError] = useState<string | null>(null)
   const [googleMapsApiKey, setGoogleMapsApiKey] = useState<string>('') // State for the Google Maps API key
   const mapRef = useRef<google.maps.Map | null>(null)

   // Fetch the Google Maps API key on component mount
   useEffect(() => {
      const fetchApiKey = async () => {
         try {
            const result = await getGoogleMapsApiKey()
            console.log('API Key result:', result)

            if (result.success && result.apiKey) {
               setGoogleMapsApiKey(result.apiKey)
            } else {
               // Handle the case where the API key wasn't found
               setError(result.error || 'Failed to load Google Maps API key')
               setLoading(false)
            }
         } catch (error) {
            console.error('Failed to fetch Google Maps API key:', error)
            setError('Error fetching Google Maps API key')
            setLoading(false)
         }
      }

      fetchApiKey()
   }, [])

   // Geocode the address to get coordinates
   const geocodeAddress = useCallback(
      async (address: string) => {
         try {
            setLoading(true)
            setError(null)

            // Use the Geocoding API to convert address to coordinates
            const response = await fetch(
               `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                  address
               )}&key=${googleMapsApiKey}`
            )

            if (!response.ok) {
               throw new Error('Geocoding request failed')
            }

            const data = await response.json()

            if (data.status === 'OK' && data.results && data.results.length > 0) {
               const { lat, lng } = data.results[0].geometry.location
               console.log('Coordinates:', { lat, lng })
               setCoordinates({ lat, lng })
            } else {
               setError('Could not find coordinates for the provided address')
            }
         } catch (error) {
            console.error('Error geocoding address:', error)
            setError('Failed to geocode address')
         } finally {
            setLoading(false)
         }
      },
      [googleMapsApiKey]
   )

   // Geocode the address when it changes or when the API key is loaded
   useEffect(() => {
      if (address && googleMapsApiKey) {
         geocodeAddress(address)
      }
   }, [address, googleMapsApiKey, geocodeAddress])

   // Define the container style for the map
   const containerStyle = {
      width: width,
      height: height,
   }

   // Function to handle map load and store reference
   const onMapLoad = useCallback((map: google.maps.Map) => {
      mapRef.current = map
   }, [])

   // Function to add the advanced marker after map is loaded
   const addAdvancedMarker = useCallback(() => {
      if (mapRef.current && coordinates && window.google && window.google.maps.marker) {
         // Clear any existing markers first
         try {
            new window.google.maps.marker.AdvancedMarkerElement({
               position: coordinates,
               map: mapRef.current,
               title: address,
            })
         } catch (error) {
            console.error('Error creating advanced marker:', error)
            // Fallback to regular marker if advanced marker fails
            if (window.google.maps.Marker) {
               new window.google.maps.Marker({
                  position: coordinates,
                  map: mapRef.current,
                  title: address,
               })
            }
         }
      }
   }, [coordinates, address])

   // Add marker when coordinates or map reference changes
   useEffect(() => {
      addAdvancedMarker()
   }, [coordinates, addAdvancedMarker])

   // Show loading state while geocoding or if the API key is not yet loaded
   if (loading || !googleMapsApiKey) {
      return (
         <div
            style={containerStyle}
            className={`flex items-center justify-center bg-gray-100 ${className}`}
         >
            <Spin tip="Loading map..." />
         </div>
      )
   }

   // Show error state if geocoding failed
   if (error) {
      return (
         <div
            style={containerStyle}
            className={`flex items-center justify-center bg-gray-100 text-red-500 ${className}`}
         >
            {error}
         </div>
      )
   }

   return (
      <div className={className} style={{ width, height }}>
         {coordinates && googleMapsApiKey && (
            <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={libraries}>
               <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={coordinates}
                  zoom={zoom}
                  onLoad={onMapLoad}
                  mapContainerClassName="map-container"
               />
            </LoadScript>
         )}
      </div>
   )
}

export default EventMap
