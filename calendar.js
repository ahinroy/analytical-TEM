// Paste the deployed Apps Script web app URL here after deployment.
const SLOT_CALENDAR_URL = 'https://script.google.com/macros/s/AKfycbzBZhXSvP2as8RuTnlehIy0Q6qIqVMPuXZbgPsXyK-VyvxBR1AJSw_alUbL_JMPn0gtYg/exec';
if (SLOT_CALENDAR_URL) {
  const frame = document.createElement('iframe');
  frame.src = SLOT_CALENDAR_URL;
  frame.title = 'Analytical TEM allotted slots calendar';
  frame.loading = 'lazy';
  document.getElementById('calendar-container').replaceChildren(frame);
}
