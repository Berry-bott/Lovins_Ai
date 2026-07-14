import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
})

export async function sendPasswordResetEmail(to: string, resetUrl: string): Promise<void> {
  const fromName = 'Lovin\'s AI'
  const fromEmail = process.env.SMTP_EMAIL || 'noreply@lovinsai.com'

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; padding: 20px 0; }
        .logo { font-size: 24px; font-weight: bold; color: #7c3aed; }
        .content { padding: 20px; background: #f9fafb; border-radius: 8px; }
        .button { 
          display: inline-block; 
          padding: 12px 24px; 
          background: #7c3aed; 
          color: white; 
          text-decoration: none; 
          border-radius: 6px; 
          font-weight: bold;
          margin: 20px 0;
        }
        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
        .expiry { color: #6b7280; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Lovin's AI</div>
        </div>
        <div class="content">
          <h2>Reset Your Password</h2>
          <p>We received a request to reset the password for your Lovin's AI account.</p>
          <p>Click the button below to set a new password:</p>
          <div style="text-align: center;">
            <a href="${resetUrl}" class="button">Reset Password</a>
          </div>
          <p class="expiry">This link will expire in 1 hour.</p>
          <p>If you didn't request this, you can safely ignore this email.</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Lovin's AI. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `

  await transporter.sendMail({
    from: `"${fromName}" <${fromEmail}>`,
    to,
    subject: 'Reset your Lovin\'s AI password',
    html,
  })
}