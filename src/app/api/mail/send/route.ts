'use server'

import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getResendApiKey } from '@/app/action/env'

console.log('Received request to /api/mail')
console.log('Resend API Key:', (await getResendApiKey()).apiKey ? 'Exists' : 'Missing')

const resend = new Resend((await getResendApiKey()).apiKey)

export async function POST(request: Request) {
   console.log('Received request to /api/mail')
   console.log('Resend API Key:', (await getResendApiKey()).apiKey ? 'Exists' : 'Missing')
   try {
      const body = await request.json()
      console.log('Request body:', JSON.stringify(body, null, 2))

      const { to, subject, html } = body

      const data = await resend.emails.send({
         from: 'no-reply@hopheadhub.com',
         to: to || ['wtaiatella@gmail.com'],
         subject: subject || 'Hello from Hop Head Hub!',
         html: html || '<p>Your Resend email is working! 🎉</p>',
      })

      console.log('Email sent successfully:', data)
      return NextResponse.json(data)
   } catch (error) {
      console.error('Email sending error:', error)
      return NextResponse.json(
         {
            error: 'Failed to send email',
            details: error instanceof Error ? error.message : String(error),
         },
         { status: 500 }
      )
   }
}
