# Set up the publication submission service

The supplied spreadsheet is used as a private review queue. Nothing is changed in it until setup runs.

1. Create a private Google Drive folder for incoming BibTeX files and copy its folder ID from its URL.
2. Open the supplied spreadsheet, select Extensions > Apps Script, and create a project. Replace Code.gs with the contents of `bibliography/Code.gs`. Set `FOLDER_ID` to the folder ID. The spreadsheet ID is already configured.
3. Add an HTML file named `PublicationForm` and paste the contents of `bibliography/PublicationForm.html` into it.
4. Save, select `setup_` in the Apps Script editor, and run it once. Grant the requested Drive and Sheets permissions. Setup refuses to overwrite a nonempty Sheet1.
5. Deploy > New deployment > Web app. Execute as yourself and choose the intended access. To allow visitors without Google accounts, select public/anyone access if your organization permits it. Deployment and access are controlled by your account.
6. Open the deployed `/exec` URL and submit one sample .bib file with one publication. Confirm the file appears in the private Drive folder and the sheet has a Pending row. Change that row's Status to Approved and reload the app: the citation should appear. Delete or reject the test row when done.
7. Paste the deployment URL into `PUBLICATIONS_WEB_APP_URL` in `publications.js`, then publish the site updates. The page's existing email option remains available.

Use one publication per .bib file. The form attempts to prefill a citation from common BibTeX fields, but submitters must check and edit it; it is not a complete BibTeX parser. Only rows whose status is Approved are shown publicly. The sheet and Drive folder need not be public. Keep them private: publication citations on approved rows become public, and file IDs or other rows do not.

A public web app accepts submissions from anyone and runs with the deployer's permissions. File-size validation and review do not prevent spam or quota exhaustion; use a restricted audience or add a separately managed anti-abuse service before relying on anonymous public uploads. The iframe permits embedding on any site; do not deploy publicly until that exposure is acceptable. Workspace administrators may restrict deployment. Test access from a signed-out browser after deployment. The live connection cannot be tested until an actual deployment URL exists.
