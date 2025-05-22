import { Resend } from 'resend'

export async function sendEmail(emailTo: string, subject: string, html: string) {
   const resend = new Resend(process.env.RESEND_API_KEY)

   const email = await resend.emails.send({
      from: 'no-reply@hopheadhub.com',
      to: emailTo,
      subject: subject,
      html: html,
   })

   console.log(email)
   return email
}
