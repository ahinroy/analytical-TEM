// Set this to the ID of a dedicated, public, privacy-reviewed facility calendar.
// Leave blank until it has been configured. Never use your personal calendar.
const PUBLIC_CALENDAR_ID = '';
if (PUBLIC_CALENDAR_ID) {
  const frame = document.createElement('iframe');
  const params = new URLSearchParams({
    src: PUBLIC_CALENDAR_ID,
    ctz: 'Asia/Kolkata',
    showTitle: '0',
    showPrint: '0',
  });
  frame.src = 'https://calendar.google.com/calendar/embed?' + params;
  frame.title = 'Analytical TEM facility calendar';
  frame.loading = 'lazy';
  document.getElementById('calendar-container').replaceChildren(frame);
}
