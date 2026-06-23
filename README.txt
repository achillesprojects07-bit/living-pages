The Living Pages V3.5 — True Mentor Complete Workbench
=======================================================

This is the definitive merged build combining the best of V3.3, V3.4, and the
full foundation repair audit completed in June 2025.


WHAT THIS VERSION IS
--------------------
A private, offline-first legacy journal PWA. Write poems, memories, essays,
letters, stories, quotes, and fragments. Attach photographs and voice notes.
Use the True Mentor for guidance — not for finished writing. Sync everything
privately to your own Firebase Legacy Vault.


WHAT WAS FIXED (from the V3.3 audit)
--------------------------------------
- Defined esc() HTML escaping helper — was missing, caused crashes app-wide.
- Defined renderEntries() — Legacy Vault was always empty without this.
- Restored all save/load functions: saveEntry, saveAsNew, replaceExisting,
  deleteEntry, markUnfinished, loadEntry, newEntry.
- Restored exportBackup and importBackup (with smart duplicate-skipping).
- Restored all photo functions: choosePhoto, attachPhoto, savePhoto,
  replacePhoto, deletePhoto.
- Restored all voice functions: startRec, stopRec, saveVoice, replaceVoice,
  deleteVoice.
- Added missing id="userStatus" element in the Firebase panel so login
  confirmation is now visible.
- Fixed version strings: title, .ver badge, and backup filename all now
  correctly read V3.5.


WHAT WAS PRESERVED FROM V3.3 (True Mentor Complete Workbench)
--------------------------------------------------------------
- Voice Profile panel: 3 sample textareas, Save / Reload / Clear.
  When you press Make It More Like Me, your saved samples are sent to the
  mentor so it can compare your new page against your authentic old writing.
- 5-Door Room: interactive door cards with gold Open buttons, Save Door,
  and Dismiss. Opens when you press Open the 5-Door Room.
- Structured mentor card rendering: all card types rendered as interactive
  cards with Use This Question / Save Guidance / Dismiss buttons.
- Saved Guidance panel: accumulates mentor questions and doors you want to
  keep. Items can be removed individually.
- Full writing doors data: all 11 theme doors, including extended paths for
  Mother, Children, Home, Photograph, Prayer, Travel, Daily Life, Becoming,
  Legacy Letter, Father, and Open / Not Sure.
- Mentor fallback: if the Cloud Function is unavailable, local guidance runs
  automatically. No raw error messages shown.


WHAT WAS ADDED FROM V3.4
------------------------
- compressImage(): photos are resized and compressed to JPEG (max 1100px,
  quality 0.78) before saving. This prevents localStorage from filling up
  with large raw images.
- 12MB voice recording size guard: oversized recordings are caught and the
  user is told to try a shorter recording instead of failing silently.
- buildCurrentItem() pattern: cleaner, more reliable entry assembly before
  every save operation.
- loadEntry() loads a vault page simultaneously into the Write tab AND the
  True Mentor Workbench so you can go straight to asking for guidance.


FILES IN THIS BUILD
-------------------
index.html          — The complete app. Replace this file only.
firebase-config.js  — Your private Firebase project config. Do not change.
firestore.rules     — Security rules (correctly scoped to userId). Do not change.
storage.rules       — Storage security rules. Do not change.
service-worker.js   — Offline caching. Cache name: living-pages-v3-4.
manifest.json       — PWA manifest. (Note: name field still reads V2.7 —
                      update manually if the installed PWA name matters to you.)
functions/          — Firebase Cloud Function protecting your OpenAI API key.
                      Only redeploy if you change the function logic.
icon-192.png        — App icon.
icon-512.png        — App icon (large).


HOW TO DEPLOY
-------------
1. Upload index.html to your GitHub Pages repository (replace existing file).
2. All other files stay the same unless noted above.
3. If the old version appears after uploading, do a hard refresh:
   - Chrome / Edge: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Or open DevTools > Application > Service Workers > Unregister, then reload.


HOW TO SET UP THE TRUE MENTOR (if not yet done)
-----------------------------------------------
1. Deploy the Cloud Function in /functions using Firebase CLI:
   firebase deploy --only functions
2. Copy the function URL from the Firebase console.
3. Open the app, go to the Firebase tab, paste the URL into Mentor Endpoint,
   and press Save Endpoint.
4. Press Test Mentor to confirm it is working.
5. If you are not using a Cloud Function, the mentor will still give local
   guidance automatically.


VOICE PROFILE — HOW TO USE IT
------------------------------
1. Go to the True Mentor tab.
2. In the Voice Profile card on the right, paste 2 or 3 of your most
   authentic old poems, stories, letters, or memories into the sample boxes.
3. Press Save Voice Profile.
4. Now when you press Make It More Like Me, the mentor sends your samples
   alongside your new page so it can protect what makes your writing yours.


OFFLINE BEHAVIOR
----------------
- Press Save Page at any time, online or offline. The page is always saved
  to this device immediately.
- When internet returns and you are logged in, pages sync automatically.
- If you are offline and not logged in, press Sync Now after logging in
  to send all pending pages to the Legacy Vault.


DATA SAFETY
-----------
- All entries are stored in localStorage under the key: living_pages_entries
- Legacy keys from V2.3 through V2.8 are automatically detected and migrated.
- Export Backup creates a dated JSON file with all your entries.
- Import Backup merges a backup file without overwriting existing pages
  (duplicate IDs are skipped).
- Firebase sync uploads photos and voice notes to Firebase Storage and
  replaces the base64 data with a permanent URL to reduce Firestore document size.


VERSION HISTORY NOTE
--------------------
V3.3 — True Mentor Complete Workbench (introduced Voice Profile, 5-Door Room,
        structured mentor cards, Saved Guidance). Several core functions were
        accidentally removed during refactor.
V3.4 — Foundation Repair (restored core functions, added image compression
        and voice size guard, but stripped Voice Profile, 5-Door Room, and
        Saved Guidance).
V3.5 — This build. All V3.3 features intact. All V3.4 improvements merged in.
        All audit bugs fixed. The complete, working version.
