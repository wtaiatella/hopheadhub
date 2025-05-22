import { NextResponse } from 'next/server'
import { sendVerificationEmail } from '@/app/actions/email-actions'

export async function POST(request: Request) {
   try {
      const { emailId } = await request.json()

      if (!emailId) {
         return NextResponse.json({ error: 'Email ID is required' }, { status: 400 })
      }

      const result = await sendVerificationEmail(emailId)

      if (!result.success) {
         return NextResponse.json(
            { error: result.error || 'Failed to send verification email' },
            { status: 500 }
         )
      }

      return NextResponse.json({ success: true })
   } catch (error) {
      console.error('Error in email verification API:', error)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
   }
}
