import { NextResponse } from 'next/server'
import { verifyEmailToken } from '@/app/action/email'
import { getEnvVariable } from '@/app/action/env'

export async function POST(request: Request) {
   try {
      const { token } = await request.json()

      if (!token) {
         return NextResponse.json({ error: 'Token is required' }, { status: 400 })
      }

      const result = await verifyEmailToken(token)

      if (!result.success) {
         return NextResponse.json(
            { error: result.error || 'Failed to verify email' },
            { status: 500 }
         )
      }

      const appUrl = await getEnvVariable('NEXT_PUBLIC_APP_URL')
      if (!appUrl.success) {
         console.error('Error getting app URL:', appUrl.error)
         return NextResponse.json({ error: 'Failed to get app URL' }, { status: 500 })
      }

      return NextResponse.redirect(`${appUrl.variable}/email-verified`)
   } catch (error) {
      console.error('Error in email verification API:', error)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
   }
}
