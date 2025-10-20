import nodemailer from "nodemailer"

// Create transporter - Configure with your email service
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

export async function POST(request) {
  try {
    const { name, email, phone, company, service, message } = await request.json()

    // Validate required fields
    if (!name || !email || !service || !message) {
      return Response.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Email to client
    const clientMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "We received your message - Relyonusdigitally",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0066ff 0%, #00d4ff 100%); padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">Thank You!</h1>
          </div>
          <div style="background: white; padding: 40px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;">
            <p style="color: #333; font-size: 16px; line-height: 1.6;">Hi ${name},</p>
            <p style="color: #666; font-size: 14px; line-height: 1.6;">
              Thank you for reaching out to Relyonusdigitally! We've received your message and will get back to you within 24 hours.
            </p>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="color: #666; font-size: 14px; margin: 0;"><strong>Service:</strong> ${service}</p>
              <p style="color: #666; font-size: 14px; margin: 10px 0 0 0;"><strong>Message:</strong> ${message}</p>
            </div>
            <p style="color: #666; font-size: 14px; line-height: 1.6;">
              In the meantime, feel free to explore our services or contact us directly at hello@relyonusdigitally.com
            </p>
            <p style="color: #666; font-size: 14px; line-height: 1.6;">
              Best regards,<br/>
              <strong>The Relyonusdigitally Team</strong>
            </p>
          </div>
        </div>
      `,
    }

    // Email to company
    const companyMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Submission - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0066ff 0%, #00d4ff 100%); padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">New Lead</h1>
          </div>
          <div style="background: white; padding: 40px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;">
            <h2 style="color: #333; margin-top: 0;">Contact Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 10px 0; color: #666; font-weight: bold;">Name:</td>
                <td style="padding: 10px 0; color: #333;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 10px 0; color: #666; font-weight: bold;">Email:</td>
                <td style="padding: 10px 0; color: #333;"><a href="mailto:${email}" style="color: #0066ff; text-decoration: none;">${email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 10px 0; color: #666; font-weight: bold;">Phone:</td>
                <td style="padding: 10px 0; color: #333;">${phone || "Not provided"}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 10px 0; color: #666; font-weight: bold;">Company:</td>
                <td style="padding: 10px 0; color: #333;">${company || "Not provided"}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 10px 0; color: #666; font-weight: bold;">Service:</td>
                <td style="padding: 10px 0; color: #333;">${service}</td>
              </tr>
            </table>
            <h3 style="color: #333; margin-top: 20px;">Message:</h3>
            <p style="color: #666; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    }

    // Send both emails
    await transporter.sendMail(clientMailOptions)
    await transporter.sendMail(companyMailOptions)

    return Response.json({ message: "Email sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("Email error:", error)
    return Response.json({ message: "Failed to send email" }, { status: 500 })
  }
}
