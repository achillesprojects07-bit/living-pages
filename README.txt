The Living Pages V3.0 — True Mentor Backend

This build keeps the offline-first legacy journal and adds backend-ready True Mentor support.

Important:
- Do not place any OpenAI/API secret key in GitHub or index.html.
- Deploy the included Firebase Cloud Function in /functions.
- Store your OpenAI API key as a Firebase secret named OPENAI_API_KEY.
- Save the deployed function endpoint in the Firebase tab of the app.

Writing rule:
The mentor guides only. It does not write poems, stories, quotes, essays, letters, or finished legacy text for Aileen.

Offline rule:
Always press Save Page. If offline, the page stays on this device and syncs when internet returns.
