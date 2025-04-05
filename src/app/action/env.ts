'use server'

export async function getRecaptchaSiteKey() {
   // Access environment variables
   const siteKey = process.env.RECAPTCHA_SITE_KEY
   if (!siteKey) {
      console.error(
         'Recaptcha site key is undefined. Make sure it is properly set in your environment variables.'
      )
      return {
         success: false,
         siteKey: undefined,
         error: 'Site key not found in environment variables',
      }
   }
   // Return result to client
   return { success: true, siteKey: siteKey }
}

export async function getGoogleMapsApiKey() {
   // Access environment variables
   const apiKey = process.env.GOOGLE_MAPS_API_KEY
   if (!apiKey) {
      console.error(
         'Google Maps API key is undefined. Make sure it is properly set in your environment variables.'
      )
      return {
         success: false,
         apiKey: undefined,
         error: 'API key not found in environment variables',
      }
   }

   // Return result to client
   return { success: true, apiKey: apiKey }
}

export async function getJwtSecret() {
   // Access environment variables
   const secret = process.env.JWT_SECRET
   if (!secret) {
      console.error(
         'JWT secret is undefined. Make sure it is properly set in your environment variables.'
      )
      return {
         success: false,
         secret: undefined,
         error: 'JWT secret not found in environment variables',
      }
   }
   // Return result to client
   return { success: true, secret: secret }
}
