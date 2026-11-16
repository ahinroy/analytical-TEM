// Paste the deployed Google Apps Script web app URL here after setup.
const PUBLICATIONS_WEB_APP_URL = '';
if (PUBLICATIONS_WEB_APP_URL) {
  const section = document.querySelector('#publications');
  document.querySelector('#publications-frame').src = PUBLICATIONS_WEB_APP_URL;
  section.hidden = false;
}
