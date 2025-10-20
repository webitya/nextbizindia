import { NextResponse } from "next/server"
import crypto from "crypto"
import nodemailer from "nodemailer"

const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
})

export async function POST(request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, formData, service } = await request.json()

    const body = razorpay_order_id + "|" + razorpay_payment_id
    const expectedSignature = crypto.createHmac("sha256", razorpayKeySecret).update(body).digest("hex")

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ success: false, error: "Invalid signature" }, { status: 400 })
    }

    const adminMailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Lead: ${service.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px;">
          <div style="background: white; border-radius: 10px; padding: 30px; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; margin-bottom: 20px;">New Service Lead</h2>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
              <p><strong>Name:</strong> ${formData.name}</p>
              <p><strong>Email:</strong> ${formData.email}</p>
              <p><strong>Phone:</strong> ${formData.phone}</p>
              <p><strong>Service:</strong> ${service.name}</p>
              <p><strong>Amount:</strong> ₹${service.price.toLocaleString("en-IN")}</p>
              <p><strong>Description:</strong> ${formData.description || "N/A"}</p>
              <p><strong>Payment ID:</strong> ${razorpay_payment_id}</p>
            </div>
            <p style="color: #666; font-size: 12px;">This is an automated message from Relyonus Digitally</p>
          </div>
        </div>
      `,
    }

    const userMailOptions = {
      from: process.env.GMAIL_USER,
      to: formData.email,
      subject: "Payment Receipt - Relyonus Digitally",
      html: `
        <div style="font-family: Arial, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px;">
          <div style="background: white; border-radius: 10px; padding: 30px; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #667eea; text-align: center; margin-bottom: 30px;">Thank You!</h1>
            <p style="color: #333; font-size: 16px;">Dear ${formData.name},</p>
            <p style="color: #666; margin-bottom: 20px;">Your payment has been successfully processed. Here's your receipt:</p>
            
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
              <h3 style="margin-top: 0;">Order Details</h3>
              <p><strong>Service:</strong> ${service.name}</p>
              <p><strong>Amount Paid:</strong> ₹${service.price.toLocaleString("en-IN")}</p>
              <p><strong>Payment ID:</strong> ${razorpay_payment_id}</p>
              <p><strong>Date:</strong> ${new Date().toLocaleDateString("en-IN")}</p>
            </div>

            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
              <h4 style="color: #333; margin-top: 0;">What's Next?</h4>
              <ul style="color: #666;">
                <li>Our team will review your project details</li>
                <li>You'll receive a confirmation call within 24 hours</li>
                <li>We'll schedule a consultation meeting</li>
                <li>Project kickoff within 48 hours</li>
              </ul>
            </div>

            <p style="color: #666; margin-bottom: 10px;">If you have any questions, feel free to reach out to us at:</p>
            <p style="color: #667eea; font-weight: bold;">support@relyonusdigitally.com</p>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            <p style="color: #999; font-size: 12px; text-align: center;">© 2025 Relyonus Digitally. All rights reserved.</p>
          </div>
        </div>
      `,
    }

    await transporter.sendMail(adminMailOptions)
    await transporter.sendMail(userMailOptions)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Payment verification error:", error)
    return NextResponse.json({ error: "Payment verification failed" }, { status: 500 })
  }
}
