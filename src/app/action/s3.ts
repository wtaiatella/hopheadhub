'use server'

import { S3Client, PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

// Create an S3 client - this runs on the server only
const s3Client = new S3Client({
   region: process.env.AWS_REGION || 'us-east-1',
   credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
   },
})

const S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME || 'hopheadhub'

/**
 * Server action to generate a presigned URL for S3 upload
 * This keeps AWS credentials secure on the server
 */
export async function generatePresignedUrl(userId: string, fileType: string) {
   try {
      console.log('S3 Action: Generating presigned URL for user', userId)
      console.log('S3 Action: File type:', fileType)
      console.log('S3 Action: Using bucket:', S3_BUCKET_NAME)
      
      const fileExtension = fileType === 'image/jpeg' ? 'jpg' : 'png'
      const key = `avatars/${userId}.${fileExtension}`

      // Configure the command with public read access
      const params: PutObjectCommandInput = {
         Bucket: S3_BUCKET_NAME,
         Key: key,
         ContentType: fileType,
         ACL: 'public-read', // Make the object publicly readable
      }
      
      const command = new PutObjectCommand(params)

      const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 600 }) // URL expires in 10 minutes
      const imageUrl = `https://${S3_BUCKET_NAME}.s3.amazonaws.com/${key}`

      console.log('S3 Action: Generated presigned URL successfully')
      return { success: true, presignedUrl, imageUrl }
   } catch (error) {
      console.error('S3 Action: Error generating presigned URL:', error)
      return { 
         success: false, 
         error: error instanceof Error ? error.message : 'Failed to generate presigned URL' 
      }
   }
}
