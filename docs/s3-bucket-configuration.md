# S3 Bucket Configuration for Hop Head Hub Avatars

To allow public access to avatar images uploaded to your S3 bucket, you need to configure the bucket permissions properly. Follow these steps:

## 1. Enable ACLs for Your Bucket

By default, new S3 buckets have ACLs (Access Control Lists) disabled. You need to enable them:

1. Go to the [AWS S3 Console](https://s3.console.aws.amazon.com/)
2. Select your bucket (`hopheadhub`)
3. Click on the "Permissions" tab
4. Scroll down to "Object Ownership" and click "Edit"
5. Select "ACLs enabled" option
6. Choose "Bucket owner preferred" or "Object writer"
7. Save changes

## 2. Modify Bucket Public Access Settings

You need to modify the bucket's block public access settings:

1. Stay in the "Permissions" tab
2. Find "Block public access (bucket settings)" and click "Edit"
3. Uncheck "Block all public access"
4. At minimum, uncheck "Block public access to buckets and objects granted through new access control lists (ACLs)"
5. Acknowledge the warning and save changes

## 3. Add a Bucket Policy (Optional but Recommended)

For more fine-grained control, you can add a bucket policy that only allows public access to the avatars folder:

1. In the "Permissions" tab, find "Bucket policy" and click "Edit"
2. Paste the following policy (replace `hopheadhub` with your actual bucket name if different):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadForAvatars",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::hopheadhub/avatars/*"
    }
  ]
}
```

3. Save changes

## 4. Configure CORS (Cross-Origin Resource Sharing)

To allow your web application to access the S3 bucket from different origins:

1. In the "Permissions" tab, find "Cross-origin resource sharing (CORS)" and click "Edit"
2. Paste the following configuration:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": []
  }
]
```

3. For production, replace `"*"` in `AllowedOrigins` with your actual domain

## Security Considerations

For a production environment, consider these security best practices:

1. Limit public access to only the specific folders needed (like avatars)
2. Use more restrictive CORS settings with specific origins
3. Consider using CloudFront with Origin Access Identity for better security and performance
4. Implement size limits and file type validation (already done in your application code)

## Troubleshooting

If you're still getting "Access Denied" errors after making these changes:

1. Verify that the object was uploaded with the correct ACL settings
2. Check if the bucket policy is correctly formatted
3. Wait a few minutes for AWS changes to propagate
4. Try uploading a new avatar after making these changes
