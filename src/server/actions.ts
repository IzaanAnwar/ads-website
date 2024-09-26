'use server';

// import * as XLSX from 'xlsx';
// import fs from 'fs/promises';
// import path from 'path';
import nodemailer from 'nodemailer';

// const EXCEL_FILE_PATH = path.join(process.cwd(), 'contact_submissions.xlsx');

export async function submitContactForm(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  try {
    const mailsToSend = [
      sendMail({
        to: data.email,
        body: `
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <tr>
              <td style="background-color: #f8f8f8; padding: 20px; border-radius: 5px;">
                <h1 style="color: #333333; font-size: 24px; margin-bottom: 20px;">Hello <strong>${data.name}</strong>,</h1>
                <p style="color: #555555; font-size: 16px; line-height: 1.5;">
                  Thank you for contacting us. We appreciate your interest and will get back to you as soon as possible.
                </p>
                <p style="color: #555555; font-size: 16px; line-height: 1.5;">
                  In the meantime, if you have any urgent questions, please don't hesitate to call our support line.
                </p>
                <p style="color: #555555; font-size: 16px; line-height: 1.5; margin-top: 20px;">
                  Best regards,<br>
                  Customer Support Team
                </p>
              </td>
            </tr>
          </table>
        `,
      }),
      sendMail({
        subject: 'New Support Request',
        to: process.env.EMAIL_USER!,
        body: `
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <tr>
              <td style="background-color: #f8f8f8; padding: 20px; border-radius: 5px;">
                <h1 style="color: #333333; font-size: 24px; margin-bottom: 20px;">New Support Request</h1>
                <p style="color: #555555; font-size: 16px; line-height: 1.5;">
                  <strong>Sender:</strong> ${data.name}<br>
                  <strong>Email:</strong> ${data.email}<br>
                  <strong>Phone:</strong> ${data.phone}
                </p>
                <h2 style="color: #333333; font-size: 18px; margin-top: 20px;">Message:</h2>
                <p style="color: #555555; font-size: 16px; line-height: 1.5; background-color: #ffffff; padding: 15px; border-radius: 5px;">
                  ${data.message}
                </p>
              </td>
            </tr>
          </table>
        `,
      }),
    ];
    await Promise.all(mailsToSend);
    return { success: true };
  } catch (e) {
    console.error({ e });
    throw new Error('Failed to submit form');
  }
  // try {
  //   let workbook: XLSX.WorkBook;

  //   // Check if the file exists
  //   try {
  //     const fileBuffer = await fs.readFile(EXCEL_FILE_PATH);
  //     workbook = XLSX.read(fileBuffer);
  //   } catch (e) {
  //     console.error({ e });
  //     // If the file doesn't exist, create a new workbook
  //     workbook = XLSX.utils.book_new();
  //     XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet([]), 'Submissions');
  //   }

  //   const sheet = workbook.Sheets['Submissions'];

  //   // Add the new submission
  //   const newRow = {
  //     Name: data.name,
  //     Email: data.email,
  //     Phone: data.phone,
  //     Message: data.message,
  //     Timestamp: new Date().toISOString(),
  //   };

  //   XLSX.utils.sheet_add_json(sheet, [newRow], { origin: -1, skipHeader: true });

  //   // Write the updated workbook back to the file
  //   await fs.writeFile(EXCEL_FILE_PATH, XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' }));

  //   return { success: true };
  // } catch (error) {
  //   console.error('Error submitting form:', error);
  //   throw new Error('Failed to submit form');
  // }
}

async function sendMail({
  body,
  name,
  to,
  subject = 'Your Access Data Systems Support Request',
}: {
  to: string | string[];
  name?: string;
  subject?: string;
  body: string;
}) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.in',
    port: 465,
    secure: true,

    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const info = await transporter.sendMail({
    from: `"${name ? name : 'Support'} Access Data Systems" query@adsystems.in`,
    to,
    subject: subject,
    html: body,
  });
  return info;
}
