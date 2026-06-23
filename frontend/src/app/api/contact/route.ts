import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Configure the SMTP transporter using standard environment variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER || 'your-email@gmail.com',
    pass: process.env.SMTP_PASS || 'your-email-password',
  },
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, institution, role, phone, interest, message } = body

    // Validate required fields
    if (!name || !email || !institution || !role || !message) {
      return NextResponse.json(
        { success: false, error: 'Please fill in all required fields.' },
        { status: 400 }
      )
    }

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; line-height: 1.6;">
        <div style="text-align: center; padding: 25px; background-color: #223292; color: #fff; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 1px;">New Academy Inquiry</h1>
          <p style="margin: 5px 0 0; font-size: 14px; opacity: 0.85;">Paragon Global Training Academy</p>
        </div>
        
        <div style="padding: 30px; border: 1px solid #eaeaea; border-top: none; border-radius: 0 0 8px 8px; background-color: #fff;">
          <p style="font-size: 16px; margin-top: 0;">You have received a new professional inquiry from the academy contact form. Here are the submission details:</p>
          
          <h3 style="color: #223292; border-bottom: 2px solid #f2d03b; padding-bottom: 5px; margin-top: 30px; text-transform: uppercase; font-size: 14px; letter-spacing: 0.5px;">Contact Details</h3>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tbody>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; width: 40%; font-weight: bold; color: #666; font-size: 13px; text-transform: uppercase;">Full Name</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-size: 14px;"><strong>${name}</strong></td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #666; font-size: 13px; text-transform: uppercase;">Email Address</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-size: 14px;"><a href="mailto:${email}" style="color: #223292; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #666; font-size: 13px; text-transform: uppercase;">Professional Role</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-size: 14px;">${role}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #666; font-size: 13px; text-transform: uppercase;">Institution / Org</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-size: 14px;">${institution}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #666; font-size: 13px; text-transform: uppercase;">Telephone Number</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-size: 14px;">${phone || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #666; font-size: 13px; text-transform: uppercase;">Programme Interest</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-size: 14px;"><span style="background-color: #ebefff; color: #223292; padding: 4px 10px; rounded: 4px; font-weight: bold; font-size: 12px; border-radius: 4px;">${interest}</span></td>
              </tr>
            </tbody>
          </table>
          
          <h3 style="color: #223292; border-bottom: 2px solid #f2d03b; padding-bottom: 5px; margin-top: 30px; text-transform: uppercase; font-size: 14px; letter-spacing: 0.5px;">Detailed Message</h3>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 6px; border-left: 4px solid #223292; font-size: 14px; color: #444; white-space: pre-wrap; line-height: 1.6; margin-top: 15px;">
            ${message}
          </div>
          
          <div style="margin-top: 40px; padding: 15px; background-color: #f8f9fa; border-radius: 8px; font-size: 13px; text-align: center; color: #666;">
            <p style="margin: 0;">This email was automatically generated and sent via the Paragon Global Training Academy website. You can reply directly to this email to communicate with the inquirer.</p>
          </div>
        </div>
      </div>
    `

    // Dispatch the email to info@pgtraining.edu
    await transporter.sendMail({
      from: '"PG Academy Inquiries" <info@pgtraining.edu>',
      to: 'info@pgtraining.edu',
      replyTo: email, // Extremely smart: clicking reply in your client replies directly to the inquirer!
      subject: `New Institutional Inquiry: ${name} - ${institution}`,
      html: htmlContent,
    })

    console.log(`[SUCCESS] Contact form inquiry from ${name} forwarded to info@pgtraining.edu via Nodemailer.`)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error dispatching email via Nodemailer:', error)
    return NextResponse.json(
      { success: false, error: 'An error occurred while dispatching the message. Please try again shortly.' },
      { status: 500 }
    )
  }
}
