import emailjs from '@emailjs/browser';

// Initialize EmailJS
emailjs.init('cupVk996Z5DZGB8k_');

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'service_ftgeu0n';
const TEMPLATE_ID = 'template_gh7effd';

// Types for form data
export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  departureDate?: Date;
  returnDate?: Date;
  departureCity?: string;
  destinationCity?: string;
  adults?: number;
  children?: number;
  infants?: number;
  class?: string;
  message?: string;
}

/**
 * Send an email to the admin with form submission details
 * @param formData The form data submitted by the user
 * @param packageName Optional package name if a specific package was selected
 * @returns Promise that resolves when the email is sent
 */
export const sendAdminEmail = async (
  formData: BookingFormData,
  packageName?: string
): Promise<void> => {
  try {
    console.log('Sending emails with EmailJS...');

    // First send the confirmation to the user
    const userTemplateParams = {
      email: formData.email,
      name: formData.name || '',
      title: packageName 
        ? `Booking Request for ${packageName}` 
        : 'Booking Request',
    };

    console.log('Sending user confirmation...');
    const userResponse = await emailjs.send(
      EMAILJS_SERVICE_ID,
      'template_gh7effd', // Auto-reply template
      userTemplateParams
    );

    console.log('User confirmation sent:', userResponse);

    // Then send the detailed notification to admin
    const adminTemplateParams = {
      email: 'tripscartuk@gmail.com',
      name: formData.name || 'Website Visitor',
      title: `New Booking Request${packageName ? ` - ${packageName}` : ''}`,
      message: `
Customer Details:
-----------------
Name: ${formData.name || 'Not provided'}
Email: ${formData.email || 'Not provided'}
Phone: ${formData.phone || 'Not provided'}

Travel Details:
--------------
Package Type: ${packageName || 'General Booking'}
Departure City: ${formData.departureCity ? formData.departureCity : 'Not specified'}
Destination: ${formData.destinationCity ? formData.destinationCity : 'Not specified'}
Departure Date: ${formData.departureDate ? (typeof formData.departureDate === 'string' ? formData.departureDate : new Date(formData.departureDate).toLocaleDateString()) : 'Not specified'}
Return Date: ${formData.returnDate ? (typeof formData.returnDate === 'string' ? formData.returnDate : new Date(formData.returnDate).toLocaleDateString()) : 'Not specified'}
Travel Class: ${formData.class ? formData.class : 'Not specified'}

Passenger Information:
--------------------
Adults: ${typeof formData.adults === 'number' ? formData.adults : (formData.adults || '0')}
Children: ${typeof formData.children === 'number' ? formData.children : (formData.children || '0')}
Infants: ${typeof formData.infants === 'number' ? formData.infants : (formData.infants || '0')}
${formData.message ? `\nAdditional Notes:\n---------------\n${formData.message}` : ''}`
    };

    console.log('Sending admin notification...');
    const adminResponse = await emailjs.send(
      EMAILJS_SERVICE_ID,
      'template_2o4q4zv', // Admin notification template
      adminTemplateParams
    );

    console.log('Admin notification sent:', adminResponse);
  } catch (error) {
    console.error('Failed to send email:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
    throw error;
  }
};

/**
 * Generate the confirmation email content for the user
 */
const generateAdminEmailContent = (formData: BookingFormData, packageName?: string): string => {
  // Keep styling simpler as the template already has its own styling
  const styles = {
    section: 'margin: 15px 0;',
    label: 'font-weight: bold;',
    row: 'margin: 10px 0;'
  };

  return `
    Customer Information:
    🧑 Name: ${formData.name || 'Not provided'}
    📧 Email: ${formData.email || 'Not provided'}
    📱 Phone: ${formData.phone || 'Not provided'}

    Travel Details:
    🎫 Package: ${packageName || 'General Booking'}
    🛫 From: ${formData.departureCity || 'Not specified'}
    🛬 To: ${formData.destinationCity || 'Not specified'}
    📅 Departure: ${formData.departureDate ? new Date(formData.departureDate).toLocaleDateString() : 'Not specified'}
    📅 Return: ${formData.returnDate ? new Date(formData.returnDate).toLocaleDateString() : 'Not specified'}
    ✈️ Class: ${formData.class || 'Not specified'}

    Passengers:
    👤 Adults: ${formData.adults || 0}
    👶 Children: ${formData.children || 0}
    👶 Infants: ${formData.infants || 0}

    ${formData.message ? `Additional Message:
    💬 ${formData.message}` : ''}
  `;
};

const generateUserConfirmationContent = (packageName?: string): string => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
      <h2 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">Thank You for Your Booking Request</h2>
      <p style="color: #666; line-height: 1.6;">
        We have received your booking request${packageName ? ` for ${packageName}` : ''}.
        Our team will review your request and get back to you within 24 hours.
      </p>
      <p style="color: #666; line-height: 1.6;">
        If you have any immediate questions, please don't hesitate to contact us.
      </p>
      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee;">
        <p style="color: #888; margin: 0;">Best regards,</p>
        <p style="color: #888; margin: 5px 0;">The Trips Cart Team</p>
      </div>
    </div>
  `;
};

/**
 * Generate the email content from the form data
 */
const generateEmailContent = (
  formData: BookingFormData,
  packageName?: string
): string => {
  // Create a formatted HTML string with all form data
  let content = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
      <h2 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">New Booking Request Details</h2>
  `;

  if (packageName) {
    content += `
      <div style="margin: 15px 0;">
        <strong style="color: #444;">Selected Package:</strong> 
        <span style="color: #666;">${packageName}</span>
      </div>
    `;
  }

  // Add all form fields to the email content
  Object.entries(formData).forEach(([key, value]) => {
    // Skip undefined, null, empty values, or the email/name fields (as they're handled separately)
    if (value === undefined || value === null || value === '' || key === 'email' || key === 'name') return;
    
    // Format dates
    if (value instanceof Date) {
      value = value.toLocaleDateString();
    }
    
    // Format the key for better readability
    const formattedKey = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
    
    content += `
      <div style="margin: 10px 0;">
        <strong style="color: #444;">${formattedKey}:</strong> 
        <span style="color: #666;">${value}</span>
      </div>
    `;
  });

  content += `
      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; color: #888; font-size: 12px;">
        This is an automated message from your booking system.
      </div>
    </div>
  `;

  return content;
};