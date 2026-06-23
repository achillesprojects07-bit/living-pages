The Living Pages V2.4 — Clear Save Actions

This version keeps the V2.3 Firebase configuration and offline-first PWA structure, but focuses on usability and confidence.

What changed:
- True Mentor was NOT upgraded yet; it remains a local preview / endpoint placeholder.
- Added clear Save Page, Save as New, Replace Existing, and Delete Page actions.
- Added Save Photo, Replace Photo, and Delete Photo.
- Added Save Voice Note, Replace Recording, and Delete Recording.
- Added visible status messages for page, photo, and voice saving.
- Added stronger button click feedback so you know when a button was pressed.
- Kept 1 compressed photo per page and 1 voice note per page, max 3 minutes.
- Kept offline-first local saving.
- Kept Firebase config, Firestore rules, Storage rules, manifest, service worker, and icons.

Important:
After uploading to GitHub Pages, open the app once online so the service worker can cache the new version. Then test offline.

Do not put private poem backups, photos, or voice recordings directly in GitHub. Store them through Firebase after login.
