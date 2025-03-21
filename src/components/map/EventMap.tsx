'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { APIProvider, Map, Marker, InfoWindow } from '@vis.gl/react-google-maps'
import { Spin } from 'antd'
import { getGoogleMapsApiKey } from '@/app/action/env'
import { processMapLocations } from './geocode'

// Define types for our components
export interface Location {
   address: string
   name?: string
   lat?: number
   lng?: number
}

interface EventMapProps {
   locations: Location[]
   height?: string
   width?: string
   zoom?: number
   className?: string
   center?: { lat: number; lng: number }
}

interface PoiProps {
   locations: Location[]
   onMarkerClick?: (location: Location) => void
   mapRef: React.RefObject<google.maps.Map | null>
}

// Component to render the markers (points of interest)
const Poi = ({ locations, onMarkerClick, mapRef }: PoiProps) => {
   const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)

   const handleMarkerClick = useCallback(
      (location: Location) => {
         setSelectedLocation(prevLocation =>
            prevLocation?.address === location.address ? null : location
         )

         if (onMarkerClick) {
            onMarkerClick(location)
         }
      },
      [onMarkerClick]
   )

   const handleInfoWindowClose = useCallback(() => {
      setSelectedLocation(null)
   }, [])

   return (
      <>
         {locations.map((location, index) => {
            if (!location.lat || !location.lng) return null

            return (
               <div key={`${location.address}-${index}`}>
                  <Marker
                     position={{ lat: location.lat, lng: location.lng }}
                     onClick={() => handleMarkerClick(location)}
                  />

                  {selectedLocation?.address === location.address && (
                     <InfoWindow
                        position={{ lat: location.lat, lng: location.lng }}
                        onCloseClick={handleInfoWindowClose}
                     >
                        <div>
                           <h3>{location.name || 'Location'}</h3>
                           <p>{location.address}</p>
                        </div>
                     </InfoWindow>
                  )}
               </div>
            )
         })}
      </>
   )
}

// Main EventMap component
const EventMap = ({
   locations,
   height = '400px',
   width = '100%',
   zoom = 15,
   className = '',
   center,
}: EventMapProps) => {
   const [googleMapsApiKey, setGoogleMapsApiKey] = useState<string>('')
   const [loading, setLoading] = useState<boolean>(true)
   const [error, setError] = useState<string | null>(null)
   const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | null>(center || null)
   const [processedLocations, setProcessedLocations] = useState<Location[]>([])
   const mapRef = useRef<google.maps.Map | null>(null)

   // Fetch the Google Maps API key on component mount
   useEffect(() => {
      const fetchApiKey = async () => {
         try {
            const result = await getGoogleMapsApiKey()

            if (result.success && result.apiKey) {
               setGoogleMapsApiKey(result.apiKey)
            } else {
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

   // Process locations to get coordinates if not provided
   useEffect(() => {
      const geocodeLocations = async () => {
         if (!googleMapsApiKey || locations.length === 0) return

         setLoading(true)

         try {
            // Process locations to add coordinates where needed
            const processed = await processMapLocations(locations, googleMapsApiKey)
            setProcessedLocations(processed)

            // Find the first location with coordinates to use as center
            const locationWithCoords = processed.find(loc => loc.lat && loc.lng)

            if (locationWithCoords && !center && !mapCenter) {
               setMapCenter({
                  lat: locationWithCoords.lat!,
                  lng: locationWithCoords.lng!,
               })
            }

            setLoading(false)
         } catch (error) {
            console.error('Error processing locations:', error)
            setError('Failed to process locations')
            setLoading(false)
         }
      }

      geocodeLocations()
   }, [googleMapsApiKey, locations, center, mapCenter])

   // Handle marker click to center the map
   const handleMarkerClick = useCallback((location: Location) => {
      if (location.lat && location.lng && mapRef.current) {
         mapRef.current.panTo({ lat: location.lat, lng: location.lng })
      }
   }, [])

   // Define the container style for the map
   const containerStyle = {
      width,
      height,
   }

   if (loading && !mapCenter) {
      return (
         <div style={containerStyle} className={`flex items-center justify-center ${className}`}>
            <Spin size="large" tip="Loading map..." />
         </div>
      )
   }

   if (error) {
      return (
         <div style={containerStyle} className={`flex items-center justify-center ${className}`}>
            <p className="text-red-500">{error}</p>
         </div>
      )
   }

   if (!googleMapsApiKey) {
      return (
         <div style={containerStyle} className={`flex items-center justify-center ${className}`}>
            <p>Google Maps API key is not available</p>
         </div>
      )
   }

   // Filter out locations without coordinates
   const validLocations = processedLocations.filter(loc => loc.lat && loc.lng)

   if (!mapCenter && validLocations.length > 0) {
      // Use the first valid location as center if no center is provided
      setMapCenter({
         lat: validLocations[0].lat!,
         lng: validLocations[0].lng!,
      })
      return null // Render will happen after state update
   }

   if (!mapCenter) {
      return (
         <div style={containerStyle} className={`flex items-center justify-center ${className}`}>
            <p>No valid locations provided</p>
         </div>
      )
   }

   return (
      <div style={containerStyle} className={className}>
         <APIProvider apiKey={googleMapsApiKey}>
            <Map
               mapId="hop-head-hub-map"
               defaultZoom={zoom}
               defaultCenter={mapCenter}
               disableDefaultUI={true}
               gestureHandling="cooperative"
               style={containerStyle}
               onIdle={event => {
                  if (event.map && !mapRef.current) {
                     mapRef.current = event.map
                  }
               }}
            >
               <Poi locations={validLocations} onMarkerClick={handleMarkerClick} mapRef={mapRef} />
            </Map>
         </APIProvider>
      </div>
   )
}

export default EventMap
