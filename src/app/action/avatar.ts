import { generatePresignedUrl } from './s3'

/**
 * Uploads an avatar image to S3 using presigned URLs
 * @param userId The user ID to associate with the avatar
 * @param file The file to upload
 * @returns Object containing success status, image URL if successful, and error if failed
 */
export async function uploadAvatar(userId: string, file: File) {
   try {
      console.log('Avatar action: Starting upload for user', userId)
      console.log('Avatar action: File type:', file.type, 'File size:', file.size)
      
      // Get presigned URL from server action
      console.log('Avatar action: Getting presigned URL from server action...')
      const urlResult = await generatePresignedUrl(userId, file.type)
      
      if (!urlResult.success || !urlResult.presignedUrl) {
         throw new Error(urlResult.error || 'Failed to generate presigned URL')
      }
      
      const { presignedUrl, imageUrl } = urlResult
      console.log('Avatar action: Got presigned URL:', presignedUrl.substring(0, 100) + '...')
      console.log('Avatar action: Image URL will be:', imageUrl)

      // Upload the file directly to S3 using the presigned URL
      console.log('Avatar action: Uploading file to S3...')
      const uploadResponse = await fetch(presignedUrl, {
         method: 'PUT',
         headers: {
            'Content-Type': file.type,
         },
         body: file,
      })

      console.log('Avatar action: S3 upload response status:', uploadResponse.status)
      
      if (!uploadResponse.ok) {
         const errorText = await uploadResponse.text()
         console.error('Avatar action: S3 upload error response:', errorText)
         throw new Error(`Failed to upload image to S3: ${uploadResponse.status} ${errorText}`)
      }

      console.log('Avatar action: Upload successful')
      return { success: true, url: imageUrl }
   } catch (error) {
      console.error('Avatar action: Error uploading avatar:', error)
      return { 
         success: false, 
         error: error instanceof Error ? error.message : 'Failed to upload avatar. Please try again.' 
      }
   }
}
