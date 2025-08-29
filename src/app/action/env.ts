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

export async function getNodeEnv() {
   // Access environment variables
   const env = process.env.NODE_ENV
   if (!env) {
      console.error(
         'Node environment is undefined. Make sure it is properly set in your environment variables.'
      )
      return {
         success: false,
         env: undefined,
         error: 'Node environment not found in environment variables',
      }
   }
   // Return result to client
   return { success: true, env: env }
}

export async function getResendApiKey() {
   // Access environment variables
   const apiKey = process.env.RESEND_API_KEY
   if (!apiKey) {
      console.error(
         'Resend API key is undefined. Make sure it is properly set in your environment variables.'
      )
      return {
         success: false,
         apiKey: undefined,
         error: 'Resend API key not found in environment variables',
      }
   }
   // Return result to client
   return { success: true, apiKey: apiKey }
}

export async function getAppUrl() {
   // Access environment variables
   const url = process.env.APP_URL
   if (!url) {
      console.error(
         'App URL is undefined. Make sure it is properly set in your environment variables.'
      )
      return {
         success: false,
         url: undefined,
         error: 'App URL not found in environment variables',
      }
   }
   // Return result to client
   return { success: true, url: url }
}

export async function getEnvVariable(envVariable: string) {
   // Access environment variables
   const variable = process.env[envVariable]
   if (!variable) {
      console.error(
         `${envVariable} is undefined. Make sure it is properly set in your environment variables.`
      )
      return {
         success: false,
         variable: undefined,
         error: `${envVariable} not found in environment variables`,
      }
   }
   // Return result to client
   return { success: true, variable: variable }
}
