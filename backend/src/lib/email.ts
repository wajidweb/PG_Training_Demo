import nodemailer from 'nodemailer';

// We need a local formatCurrency for the backend
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(amount);
};

// Configure the SMTP transporter
// Make sure to add these to your backend/.env file
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com', // Replace with your actual SMTP host (e.g., Office365, SendGrid, Mailgun)
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || 'your-email@gmail.com', // e.g., SMTP username
    pass: process.env.SMTP_PASS || 'your-email-password', // e.g., App Password
  },
});

export const sendOrderConfirmationEmail = async (order: any) => {
  try {
    const { contact, items, orderNumber, total } = order;

    // Build the items HTML list
    const itemsHtml = items.map((item: any) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">
          <strong>${item.courseCode} - ${item.courseTitle}</strong><br>
          <span style="font-size: 12px; color: #666;">
            ${item.deliveryMethod?.label || 'Online'} | ${item.participants} Participant(s) 
            ${item.selectedDate ? `| Date: ${new Date(item.selectedDate.split('|')[0]).toLocaleDateString()}` : ''}
          </span>
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
          ${formatCurrency(item.finalPrice)}
        </td>
      </tr>
    `).join('');

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; line-height: 1.6;">
        <div style="text-align: center; padding: 20px; background-color: #223292; color: #fff; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">Thank You for Your Order</h1>
        </div>
        
        <div style="padding: 20px; border: 1px solid #eaeaea; border-top: none; border-radius: 0 0 8px 8px;">
          <p>Dear ${contact.firstName} ${contact.lastName},</p>
          
          <p>Thank you for choosing PG Training for your professional development. Your payment has been successfully processed, and your enrolment is now confirmed.</p>
          
          <p><strong>Order Reference:</strong> ${orderNumber}</p>
          
          <h3 style="color: #223292; margin-top: 30px; border-bottom: 2px solid #f2d03b; padding-bottom: 5px;">Order Summary</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tbody>
              ${itemsHtml}
              <tr>
                <td style="padding: 10px; text-align: right; font-weight: bold;">Total Paid:</td>
                <td style="padding: 10px; text-align: right; font-weight: bold; color: #223292; font-size: 18px;">
                  ${formatCurrency(total)}
                </td>
              </tr>
            </tbody>
          </table>
          
          <h3 style="color: #223292; margin-top: 30px;">What Happens Next?</h3>
          <p>Our team is currently preparing your enrolment details. You will receive a separate email shortly with further onboarding instructions, including access details to your course materials and dashboard.</p>
          
          <div style="margin-top: 40px; padding: 15px; background-color: #f8f9fa; border-radius: 8px; font-size: 14px; text-align: center;">
            <p style="margin: 0;">If you have any questions regarding your order, please do not hesitate to contact us at <a href="mailto:info@pgtraining.edu" style="color: #45a29e; text-decoration: none;">info@pgtraining.edu</a>.</p>
          </div>
          
          <p style="margin-top: 40px; font-size: 14px; color: #888;">
            Best regards,<br>
            <strong>The PG Training Team</strong><br>
            <em>Bespoke Learning. Lasting Growth.</em>
          </p>
        </div>
      </div>
    `;

    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"PG Training" <info@pgtraining.edu>', // sender address
      to: contact.email, // list of receivers
      subject: `Order Confirmation - PG Training (#${orderNumber})`, // Subject line
      html: htmlContent, // html body
    });

    console.log('Order confirmation email sent: %s', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    return false;
  }
};
