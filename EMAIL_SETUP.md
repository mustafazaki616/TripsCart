# Email Setup Instructions

## Overview

This project uses EmailJS to send form submission notifications to the admin email address. When a user submits any booking form, an email is sent to `Admin@tripscart.co.uk` with the details of the submission.

## Setup Instructions

1. **Create an EmailJS Account**
   - Go to [EmailJS](https://www.emailjs.com/) and sign up for an account
   - The free tier allows 200 emails per month

2. **Create an Email Service**
   - In your EmailJS dashboard, go to "Email Services"
   - Add a new service (Gmail, Outlook, or other email provider)
   - Follow the instructions to connect your email account

3. **Create an Email Template**
   - Go to "Email Templates" in your EmailJS dashboard
   - Create a new template
   - Design your email template with the following variables:
     - `to_email`: The admin email address
     - `from_name`: The name of the person submitting the form
     - `from_email`: The email of the person submitting the form
     - `phone`: The phone number of the person submitting the form
     - `message`: The formatted message containing all form details
     - `subject`: The subject line of the email

4. **Update Configuration**
   - Open the file `src/lib/email.ts`
   - Replace the placeholder values with your actual EmailJS credentials:
     ```typescript
     const EMAILJS_USER_ID = 'YOUR_USER_ID'; // Replace with your User ID
     const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'; // Replace with your Service ID
     const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Replace with your Template ID
     ```

## Testing

1. Fill out any booking form on the website
2. Submit the form
3. Check the admin email inbox for the notification
4. Verify that all form details are included in the email

## Troubleshooting

- If emails are not being sent, check the browser console for error messages
- Verify that your EmailJS account is active and has available email quota
- Ensure that the email service is properly connected
- Check that the template variables match those used in the code

## Security Considerations

In a production environment, you should:

1. Store the EmailJS credentials in environment variables
2. Implement server-side email sending for better security
3. Add rate limiting to prevent abuse
4. Consider adding CAPTCHA to prevent spam submissions