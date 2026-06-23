const { onRequest } = require('firebase-functions/v2/https');
const { defineSecret } = require('firebase-functions/params');
const admin = require('firebase-admin');
const OpenAI = require('openai');

admin.initializeApp();
const OPENAI_API_KEY = defineSecret('OPENAI_API_KEY');

function corsHeaders(res) {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

function cleanText(value, max = 7000) {
  return String(value || '').replace(/\u0000/g, '').slice(0, max).trim();
}

exports.livingPagesMentor = onRequest({
  region: 'us-central1',
  secrets: [OPENAI_API_KEY],
  maxInstances: 3,
  timeoutSeconds: 60,
  memory: '256MiB'
}, async (req, res) => {
  corsHeaders(res);
  if (req.method === 'OPTIONS') return res.status(204).send('');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST.' });

  try {
    const authHeader = req.get('Authorization') || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
    if (!token) return res.status(401).json({ error: 'Please log in before using True Mentor.' });

    const decoded = await admin.auth().verifyIdToken(token);
    if (!decoded || !decoded.uid) return res.status(401).json({ error: 'Invalid login.' });

    const body = req.body || {};
    const mode = cleanText(body.mode, 40) || 'deeper';
    const title = cleanText(body.title, 120) || 'Untitled page';
    const type = cleanText(body.type, 80) || 'Page';
    const theme = cleanText(body.theme, 80) || 'Open / Not sure';
    const anchor = cleanText(body.anchor, 120);
    const strongestImage = cleanText(body.strongestImage, 120);
    const draft = cleanText(body.draft, 7000);
    const photoAttached = !!body.photoAttached;
    const voiceAttached = !!body.voiceAttached;

    if (!draft) return res.status(400).json({ error: 'Write or paste a page first.' });

    const modeGuide = {
      clearer: 'Focus on clarity: what is confusing, too general, repetitive, or trying to carry too many ideas. Offer practical edits as guidance only.',
      voice: 'Focus on whether this sounds like Aileen: memory through image, ordinary things as witnesses, tenderness, reverence, love, grief, family, God, time, and simple human endings.',
      finish: 'Help Aileen finish without writing the ending. Identify what is missing and offer 3 ending paths plus precise questions she can answer herself.',
      deeper: 'Ask deeper but specific questions that open memory and meaning without being vague or abstract.',
      continue: 'Help Aileen continue. Identify the next doorway: place, person, object, image, time, or truth. Give concrete next steps.'
    }[mode] || 'Give tailored mentor guidance only.';

    const system = `You are True Mentor inside The Living Pages, Aileen's private legacy journal.\n\nABSOLUTE AUTHORSHIP RULES:\n- Do not write the poem, story, quote, essay, letter, or finished legacy text for Aileen.\n- Do not provide a polished final version.\n- Do not create beautiful lines for her to copy as her own.\n- You may give mentor guidance, reflection, craft notes, questions, structural suggestions, and optional line-level clarity comments.\n- Preserve her authorship and voice.\n\nAileen's voice often uses memory, family, motherhood, mother-loss, father memories, home, prayer, God, trees, moon, flowers, photographs, ordinary rituals, and objects as witnesses. She dislikes vague prompts. Guidance must be specific, inspiring, practical, and emotionally intelligent.\n\nTone: elegant, warm, encouraging, clear. Not academic. Not generic. Not therapy jargon. Not forced positivity.`;

    const user = `Mode requested: ${mode}\nMode instruction: ${modeGuide}\n\nPage context:\nTitle: ${title}\nType: ${type}\nTheme / Door: ${theme}\nMemory anchor: ${anchor || '(none)'}\nStrongest image detected: ${strongestImage || '(none)'}\nPhoto attached: ${photoAttached ? 'yes' : 'no'}\nVoice attached: ${voiceAttached ? 'yes' : 'no'}\n\nAileen's current page:\n---\n${draft}\n---\n\nRespond in this structure:\n1. What I hear in this page\n2. What feels alive / strongest\n3. What may be missing or unclear\n4. Specific next steps for Aileen to write herself\n5. If mode is finish: give three possible ending paths, not ending lines.\n\nDo not write the final piece. Do not rewrite her page.`;

    const client = new OpenAI({ apiKey: OPENAI_API_KEY.value() });
    const response = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user }
      ],
      temperature: 0.45,
      max_tokens: 850
    });

    const guidance = response.choices?.[0]?.message?.content || '';
    return res.status(200).json({ guidance });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || 'True Mentor failed.' });
  }
});
