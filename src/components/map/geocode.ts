'use client'

import { Location } from './EventMap'

/**
 * Geocodes an address to get coordinates
 * @param address The address to geocode
 * @param apiKey Google Maps API key
 * @returns Promise with lat/lng coordinates
 */
export async function geocodeAddress(address: string, apiKey: string): Promise<{ lat: number; lng: number } | null> {
  try {
    // Use the Geocoding API to convert address to coordinates
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${apiKey}`
    )

    if (!response.ok) {
      throw new Error('Geocoding request failed')
    }

    const data = await response.json()
    
    if (data.status === 'OK' && data.results && data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry.location
      return { lat, lng }
    } else {
      console.error('Could not find coordinates for the provided address:', data.status)
      return null
    }
  } catch (error) {
    console.error('Error geocoding address:', error)
    return null
  }
}

/**
 * Batch geocodes multiple addresses
 * @param addresses Array of addresses to geocode
 * @param apiKey Google Maps API key
 * @returns Promise with array of results
 */
export async function batchGeocodeAddresses(
  addresses: string[],
  apiKey: string
): Promise<Array<{ address: string; lat: number; lng: number } | null>> {
  // To avoid rate limiting, we'll process in batches
  const batchSize = 5
  const results: Array<{ address: string; lat: number; lng: number } | null> = []
  
  for (let i = 0; i < addresses.length; i += batchSize) {
    const batch = addresses.slice(i, i + batchSize)
    
    // Process batch in parallel
    const batchResults = await Promise.all(
      batch.map(async (address) => {
        const coords = await geocodeAddress(address, apiKey)
        return coords ? { address, ...coords } : null
      })
    )
    
    results.push(...batchResults)
    
    // Add a small delay to avoid hitting rate limits
    if (i + batchSize < addresses.length) {
      await new Promise(resolve => setTimeout(resolve, 200))
    }
  }
  
  return results
}

/**
 * Process locations for the EventMap component
 * Adds coordinates to locations that don't have them
 * @param locations Array of locations
 * @param apiKey Google Maps API key
 * @returns Promise with processed locations
 */
export async function processMapLocations(
  locations: Location[],
  apiKey: string
): Promise<Location[]> {
  // Filter locations that need geocoding (have address but no coordinates)
  const locationsToGeocode = locations.filter(
    loc => loc.address && (!loc.lat || !loc.lng)
  )
  
  // If no locations need geocoding, return the original array
  if (locationsToGeocode.length === 0) {
    return locations
  }
  
  // Extract addresses to geocode
  const addressesToGeocode = locationsToGeocode.map(loc => loc.address)
  
  // Geocode the addresses
  const geocodeResults = await batchGeocodeAddresses(addressesToGeocode, apiKey)
  
  // Create a map of address to coordinates for quick lookup
  const addressToCoords = new Map<string, { lat: number; lng: number }>()
  geocodeResults.forEach(result => {
    if (result) {
      addressToCoords.set(result.address, { lat: result.lat, lng: result.lng })
    }
  })
  
  // Update the locations with the geocoded coordinates
  return locations.map(location => {
    // If location already has coordinates, return it as is
    if (location.lat && location.lng) {
      return location
    }
    
    // Try to find coordinates for this address
    const coords = addressToCoords.get(location.address)
    if (coords) {
      return {
        ...location,
        lat: coords.lat,
        lng: coords.lng
      }
    }
    
    // If geocoding failed, return the original location
    return location
  })
}
