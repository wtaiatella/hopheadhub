# Avatar Upload with AWS S3

This document explains how to set up AWS S3 for avatar uploads in the Hop Head Hub application.

## AWS S3 Setup

1. **Create an S3 Bucket**:
   - Log in to your AWS Management Console
   - Navigate to S3 service
   - Click "Create bucket"
   - Name your bucket `hopheadhub-avatars` (or choose another name)
   - Select your preferred region (e.g., us-east-1)
   - Keep default settings for most options
   - Under "Block Public Access settings", you may want to uncheck "Block all public access" if you want the avatars to be publicly accessible
   - Click "Create bucket"

2. **Configure CORS for the Bucket**:
   - Select your newly created bucket
   - Go to the "Permissions" tab
   - Scroll down to "Cross-origin resource sharing (CORS)"
   - Click "Edit" and paste the following configuration:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["PUT", "POST", "GET"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": []
  }
]
```

   - For production, replace `"*"` in `AllowedOrigins` with your actual domain

3. **Create an IAM User for S3 Access**:
   - Navigate to the IAM service
   - Click "Users" and then "Create user"
   - Name the user `hopheadhub-s3-user`
   - Under "Set permissions", select "Attach policies directly"
   - Search for and select "AmazonS3FullAccess" (for production, create a more restrictive policy)
   - Complete the user creation process
   - After creation, go to the "Security credentials" tab
   - Click "Create access key"
   - Select "Application running outside AWS"
   - Create the access key and securely save the Access Key ID and Secret Access Key

## Application Configuration

1. **Update Environment Variables**:
   - Open `.env.local` in the project root
   - Replace the placeholder values with your actual AWS credentials:

```
AWS_REGION=your-selected-region
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_S3_BUCKET_NAME=your-bucket-name
```

2. **Restart the Development Server**:
   - After updating the environment variables, restart your Next.js development server to apply the changes

## How It Works

1. When a user selects an image for upload:
   - The client sends a request to `/api/user/avatar` with the file type
   - The server generates a presigned URL for direct upload to S3
   - The client uploads the file directly to S3 using the presigned URL
   - The image URL is returned and can be saved to the user's profile

2. Security Considerations:
   - Presigned URLs expire after 10 minutes
   - File size is limited to 2MB
   - Only JPEG and PNG formats are allowed

## Production Considerations

For production deployment:

1. Create a more restrictive IAM policy that only allows access to the specific S3 bucket
2. Set up CloudFront CDN for faster image delivery
3. Implement image optimization (resizing, compression) before upload
4. Consider adding a cleanup process for unused avatars
