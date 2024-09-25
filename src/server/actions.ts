'use server';

import * as XLSX from 'xlsx';
import fs from 'fs/promises';
import path from 'path';

const EXCEL_FILE_PATH = path.join(process.cwd(), 'contact_submissions.xlsx');

export async function submitContactForm(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  try {
    let workbook: XLSX.WorkBook;

    // Check if the file exists
    try {
      const fileBuffer = await fs.readFile(EXCEL_FILE_PATH);
      workbook = XLSX.read(fileBuffer);
    } catch (error) {
      // If the file doesn't exist, create a new workbook
      workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet([]), 'Submissions');
    }

    const sheet = workbook.Sheets['Submissions'];

    // Add the new submission
    const newRow = {
      Name: data.name,
      Email: data.email,
      Phone: data.phone,
      Message: data.message,
      Timestamp: new Date().toISOString(),
    };

    XLSX.utils.sheet_add_json(sheet, [newRow], { origin: -1, skipHeader: true });

    // Write the updated workbook back to the file
    await fs.writeFile(EXCEL_FILE_PATH, XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' }));

    return { success: true };
  } catch (error) {
    console.error('Error submitting form:', error);
    throw new Error('Failed to submit form');
  }
}
