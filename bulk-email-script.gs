function sendPersonalizedEmails() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const startRow = 2; // start from row 2 (row 1 is header)
  const lastRow = sheet.getLastRow();
  const numRows = lastRow - startRow + 1;

  if (numRows <= 0) {
    Logger.log('No data rows found.');
    return;
  }

  // Get columns A–C (1 = A, 3 = C)
  const dataRange = sheet.getRange(startRow, 1, numRows, 3);
  const data = dataRange.getValues();

  const resumeLink = 'google doc link';
  const subject = 'looking for Summer Internship';

  data.forEach(function(row, i) {
    const firstName = row[0]; // Column A
    const email = row[2];     // Column C

    // Skip empty rows
    if (!email || !firstName) {
      return;
    }

    const name = String(firstName).trim();

    const plainBody =
      'Hi ' + name + ',\n\n' +
      'This is the google doc link to my resume for your reference:\n' + resumeLink + '\n\n' +
      'Looking forward to hearing from you!\n\n' +
  
      'email body';

    const htmlBody =
      'Hi ' + name + ',<br><br>' +
      'This is the google doc link to my resume for your reference: ' +
      '<a href="' + resumeLink + '">view resume</a>.<br><br>' +
      'email body';

    MailApp.sendEmail({
      to: email,
      subject: subject,
      body: plainBody,
      htmlBody: htmlBody
    });

    Logger.log('Email sent to: ' + email);
  });
}
