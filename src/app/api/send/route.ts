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
    let transporter = nodemailer.createTransport({
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
      to: 'mdizaan67@gmail.com',
      subject: 'New Job Application',
      text: `
        New application received from ${fullName}
        Email: ${email}
        Phone: ${phone}
        Education: ${educationQualification}
        Technical Qualification: ${technicalQualification}
        Areas of Interest: ${areasOfInterest.join(', ')}
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
      text: `
        Dear ${fullName},

        Thank you for submitting your application. We have received your information and will review it shortly.

        If your profile matches our requirements, we will contact you for the next steps in the selection process.

        Best regards,
        The Hiring Team
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
