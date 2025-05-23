import { Resend } from 'resend'
import { getEnvVariable } from '../app/action/env'

interface SendEmailResponse {
   success: boolean
   data?: {
      id: string
      from: string
      to: string | string[]
      subject: string
   }
   error?: {
      message: string
      code?: string
      details?: any
   }
}

export async function sendEmail(
   to: string | string[],
   subject: string,
   html: string,
   from: string = 'no-reply@hopheadhub.com'
): Promise<SendEmailResponse> {
   try {
      const {
         success,
         variable: apiKey,
         error: envVarError,
      } = await getEnvVariable('RESEND_API_KEY')
      if (!success) {
         console.error(envVarError)
         return {
            success: false,
            error: {
               message: envVarError || 'RESEND_API_KEY_NOT_FOUND',
               code: 'RESEND_API_KEY_NOT_FOUND',
            },
         }
      }

      if (!to || (Array.isArray(to) && to.length === 0)) {
         console.error('No recipients specified')
         return {
            success: false,
            error: {
               message: 'No recipients specified',
               code: 'NO_RECIPIENTS',
            },
         }
      }

      const { data, error: resendError } = await new Resend(apiKey).emails.send({
         from,
         to,
         subject,
         html,
      })

      if (resendError) {
         console.error('Resend API error:', resendError)
         return {
            success: false,
            error: {
               message: resendError.message,
               code: resendError.name,
               details: resendError,
            },
         }
      }

      if (!data?.id) {
         console.error('No email ID returned from Resend')
         return {
            success: false,
            error: {
               message: 'No email ID returned from Resend',
               code: 'NO_EMAIL_ID',
            },
         }
      }

      // Log successful email sending (you might want to store this in your database)
      console.log(`Email sent successfully: ${data.id}`, {
         to,
         subject,
         messageId: data.id,
      })

      return {
         success: true,
         data: {
            id: data.id,
            from: from, // Use the from parameter passed to the function
            to: to, // Use the to parameter passed to the function
            subject: subject, // Use the subject parameter passed to the function
         },
      }
   } catch (err) {
      console.error('Error sending email:', err)

      const errorObj = err as Error
      return {
         success: false,
         error: {
            message: errorObj.message || 'Failed to send email',
            code: 'EMAIL_SEND_FAILED',
            details: process.env.NODE_ENV === 'development' ? errorObj.stack : undefined,
         },
      }
   }
}
