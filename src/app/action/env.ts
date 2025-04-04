'use server'

export async function getRecaptchaSiteKey() {
   // Access environment variables
   const siteKey = process.env.RECAPTCHA_SITE_KEY

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

   // Return result to client
   return { success: true, secret: secret }
}
