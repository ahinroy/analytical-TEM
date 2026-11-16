const SPREADSHEET_ID = '1tVX4yBKvkMQYMZ9Lq14Maz-k78lo7kjjLwTjaGgF1zU';
const SHEET_NAME = 'Sheet1';
const FOLDER_ID = 'PASTE_PRIVATE_DRIVE_FOLDER_ID';
const HEADERS = ['Submitted', 'Status', 'Citation', 'BibTeX file ID'];
const MAX_BYTES = 100000;

function doGet() {
  return HtmlService.createHtmlOutputFromFile('PublicationForm')
    .setTitle('Analytical TEM publications')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// Run once from the editor, after setting FOLDER_ID. Never overwrites data.
function setup_() {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  if (!sheet) throw new Error('Sheet1 not found.');
  if (sheet.getLastRow() !== 0) throw new Error('Sheet is not empty; headers were not changed.');
  DriveApp.getFolderById(FOLDER_ID);
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  sheet.setFrozenRows(1);
}

function getPublications() {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  if (sheet.getLastRow() < 2) return [];
  return sheet.getRange(2, 1, sheet.getLastRow() - 1, 3).getDisplayValues()
    .filter(row => row[1].trim().toLowerCase() === 'approved' && row[2].trim())
    .map(row => row[2]);
}

function submitBibliography(filename, text, citation) {
  if (typeof filename !== 'string' || !/\.bib$/i.test(filename)) throw new Error('Please select a .bib file.');
  if (typeof text !== 'string' || !/@\w+\s*[{(]/.test(text)) throw new Error('The file does not appear to contain a BibTeX entry.');
  if (Utilities.newBlob(text).getBytes().length > MAX_BYTES) throw new Error('File must be no larger than 100 KB.');
  if (typeof citation !== 'string' || !citation.trim() || citation.length > 2000) throw new Error('Please provide a citation of up to 2,000 characters.');
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    if (sheet.getRange(1, 1, 1, 4).getDisplayValues()[0].join('|') !== HEADERS.join('|')) throw new Error('The review sheet has not been set up.');
    const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_').slice(-100);
    const file = DriveApp.getFolderById(FOLDER_ID).createFile(Utilities.newBlob(text, 'text/plain', safeName));
    try {
      const row = sheet.getLastRow() + 1;
      sheet.getRange(row, 1, 1, 4).setNumberFormat('@').setValues([[new Date().toISOString(), 'Pending', "'" + citation.trim(), file.getId()]]);
    } catch (error) {
      file.setTrashed(true);
      throw error;
    }
    return 'Submitted for review. Thank you.';
  } finally { lock.releaseLock(); }
}
