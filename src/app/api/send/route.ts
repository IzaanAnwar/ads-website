import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

// Define the Zod schema for form data, including the actual file objects for the resume and photo
const emailBody = z.object({
  fullName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  educationQualification: z.string(),
  technicalQualification: z.string(),
  areasOfInterest: z.array(z.string()),
  resume: z.object({
    filename: z.string(),
    content: z.record(z.number()),
    contentType: z.string(),
  }),
  photo: z.object({
    filename: z.string(),
    content: z.record(z.number()),
    contentType: z.string(),
  }),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate the request body
    const {
      fullName,
      email,
      phone,
      educationQualification,
      technicalQualification,
      areasOfInterest,
      resume,
      photo,
    } = emailBody.parse(body);

    // Create a nodemailer transporter for sending the email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Convert the numeric object into a Buffer
    const resumeBuffer = Buffer.from(Object.values(resume.content));
    const photoBuffer = Buffer.from(Object.values(photo.content));

    // Prepare the email to the company with attachments
    const companyMail = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'New Job Application',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Job Application</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px;">
          <table cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
              <td style="background-color: #f4f4f4; padding: 20px; text-align: center;">
                <h1 style="color: #2c3e50; margin: 0;">New Job Application Received</h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 20px;">
                <h2 style="color: #2980b9;">Applicant Information</h2>
                <table cellpadding="10" cellspacing="0" border="0" width="100%" style="background-color: #ecf0f1; margin-bottom: 20px;">
                  <tr>
                    <td width="30%" style="font-weight: bold;">Full Name:</td>
                    <td>${fullName}</td>
                  </tr>
                  <tr>
                    <td width="30%" style="font-weight: bold;">Email:</td>
                    <td>${email}</td>
                  </tr>
                  <tr>
                    <td width="30%" style="font-weight: bold;">Phone:</td>
                    <td>${phone}</td>
                  </tr>
                </table>
                
                <h2 style="color: #2980b9;">Qualifications</h2>
                <table cellpadding="10" cellspacing="0" border="0" width="100%" style="background-color: #ecf0f1; margin-bottom: 20px;">
                  <tr>
                    <td width="30%" style="font-weight: bold;">Education:</td>
                    <td>${educationQualification}</td>
                  </tr>
                  <tr>
                    <td width="30%" style="font-weight: bold;">Technical Qualification:</td>
                    <td>${technicalQualification}</td>
                  </tr>
                </table>
                
                <h2 style="color: #2980b9;">Areas of Interest</h2>
                <p style="background-color: #ecf0f1; padding: 10px;">${areasOfInterest.join(', ')}</p>
                
                <h2 style="color: #2980b9;">Attachments</h2>
                <ul style="list-style-type: none; padding-left: 0;">
                  <li style="margin-bottom: 10px;">📎 <strong>Resume:</strong> ${resume.filename}</li>
                  <li>🖼️ <strong>Photo:</strong> ${photo.filename}</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 14px; color: #7f8c8d;">
                This is an automated email. Please do not reply directly to this message.
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
      attachments: [
        {
          filename: resume.filename,
          content: resumeBuffer,
          contentType: resume.contentType,
        },
        {
          filename: photo.filename,
          content: photoBuffer,
          contentType: photo.contentType,
        },
      ],
    };

    // Prepare the confirmation email to the applicant
    const applicantMail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Application Received',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Application Received</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <table cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
              <td style="background-color: #2980b9; padding: 20px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0;">Application Received</h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 20px;">
                <p>Dear ${fullName},</p>
                <p>Thank you for submitting your application. We have received your information and will review it shortly.</p>
                <p>If your profile matches our requirements, we will contact you for the next steps in the selection process.</p>
                <p>Best regards,<br>The Hiring Team</p>
              </td>
            </tr>
            <tr>
              <td style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 14px; color: #7f8c8d;">
                This is an automated email. Please do not reply directly to this message.
              </td>
            </tr>
            
          </table>
        </body>
        </html>
      `,
    };
    // Use Promise.all to send both emails concurrently
    await Promise.all([transporter.sendMail(companyMail), transporter.sendMail(applicantMail)]);

    // Respond with success message
    return NextResponse.json({ message: 'Emails sent successfully' });
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      console.error('Invalid request body:', error.issues);
      return NextResponse.json(
        { message: 'Invalid request body', issues: error.issues },
        { status: 400 }
      );
    }

    // Log and return general errors
    console.error('Error sending emails:', error);
    return NextResponse.json({ message: 'Error sending emails' }, { status: 500 });
  }
}
