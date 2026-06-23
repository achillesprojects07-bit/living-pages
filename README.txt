The Living Pages V2.5 Offline Prompt Polish

Changes from V2.4:
- True Mentor was NOT changed; it remains a preview/placeholder until the secure AI backend is built.
- Fixed the bug where guidance labels such as [Travel / Vacation — WAVES] were inserted into the draft.
- Rewrote prompt banks to be more beautiful, inspiring, reflective, and specific across all doors.
- Added app-wide offline wording and pending sync status for text, photo, and voice.
- Pages, photos, and voice save on device first; Firebase sync happens when online and logged in.
- Kept clear Save / Replace / Delete actions.
- Kept one compressed photo + one voice note per page, with 3-minute voice cap.

Installation:
Upload all files in this folder to GitHub Pages. Open once online so the service worker caches the app shell. After that, the app can open offline.

Important:
Offline text is safest. Photos and voice are stored locally as pending data until sync succeeds. Always keep Export Backup available for legacy safety.
