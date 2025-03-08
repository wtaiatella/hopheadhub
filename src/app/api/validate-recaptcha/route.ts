import { NextResponse } from 'next/server'
import axios from 'axios'

// POST request to validate reCAPTCHA
export async function POST(request: Request) {
   const body = await request.json() // Parse the JSON body
   const { token } = body // Extract the reCAPTCHA token

   if (!token) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 })
   }

   try {
      // Send request to Google to verify reCAPTCHA token
      const secretKey = process.env.RECAPTCHA_SECRET_KEY // Ensure your secret key is in .env
      const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
         params: {
            secret: secretKey,
            response: token,
         },
      })

      const { success } = response.data

      if (success) {
         return NextResponse.json({ success: true })
      } else {
         return NextResponse.json({ success: false, error: 'Invalid captcha' }, { status: 400 })
      }
   } catch (error) {
      console.error('CAPTCHA verification error:', error)
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
   }
}
