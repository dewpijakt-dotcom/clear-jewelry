/**
 * Clear Jewelry — Bookings sheet endpoint.
 *
 * Paste this into Google Apps Script (Extensions → Apps Script) for the
 * "Clear Jewelry — Bookings" spreadsheet, then deploy as a Web App:
 *
 *   Deploy → New deployment → Type: Web app
 *   Execute as:    Me (your Google account)
 *   Who has access: Anyone
 *   → Deploy → copy the Web app URL → paste back to the developer
 *
 * The URL goes into the Vercel env var GOOGLE_SHEETS_WEBHOOK_URL.
 *
 * On every POST from /api/book, this script appends one row to the
 * "Bookings" sheet. Columns are created automatically on first run if
 * the sheet is empty.
 */

const SHEET_NAME = 'Bookings';
const COLUMNS = [
  'Timestamp',  // ISO UTC, e.g. 2026-06-16T03:22:18.421Z
  'Name',
  'Contact',    // LINE id / phone / email — whatever the visitor gave us
  'Date',       // requested visit date (YYYY-MM-DD, visitor-local)
  'Slot',       // 11:00 · 12:00 · 13:00 · 14:00 · 15:00
  'Message',    // free-text "How can we help you?"
  'Locale',     // en or th
  'UserAgent',  // browser string (optional)
];

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || '{}');

    // Minimum validation — reject obviously empty submissions.
    if (!payload.name || (!payload.line && !payload.phone && !payload.email)) {
      return ContentService
        .createTextOutput(JSON.stringify({ ok: false, error: 'missing required fields' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }

    // Ensure header row matches expected columns (idempotent).
    const first = sheet.getRange(1, 1, 1, COLUMNS.length).getValues()[0];
    const needsHeader = first.every((c) => !c) || first[0] !== 'Timestamp';
    if (needsHeader) {
      sheet.getRange(1, 1, 1, COLUMNS.length).setValues([COLUMNS]).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    // Compose contact field (in priority order: LINE > phone > email).
    const contact = [
      payload.line ? 'LINE ' + payload.line : null,
      payload.phone || null,
      payload.email || null,
    ].filter(Boolean).join(' · ');

    sheet.appendRow([
      payload.timestamp || new Date().toISOString(),
      payload.name,
      contact,
      payload.date || '',
      payload.time || '',
      payload.message || '',
      payload.locale || 'en',
      (e.parameter && e.parameter.ua) || '',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Lets you sanity-check the URL in a browser — returns "ok".
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, service: 'clear-jewelry bookings' }))
    .setMimeType(ContentService.MimeType.JSON);
}
