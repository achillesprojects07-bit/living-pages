// Firebase web config for The Living Pages.
// This is not a password. Privacy is protected by Firebase Authentication + Security Rules.
window.LIVING_PAGES_FIREBASE_CONFIG = {
  apiKey: "AIzaSyDto9psGnEdGAYvc7iNdf0xjYH613Fw8FY",
  authDomain: "the-living-pages.firebaseapp.com",
  projectId: "the-living-pages",
  storageBucket: "the-living-pages.firebasestorage.app",
  messagingSenderId: "247260914179",
  appId: "1:247260914179:web:108c7911d797717face436"
};

// Later, for true AI mentor guidance, point this to a secure Cloud Function.
// Do NOT put OpenAI or other secret keys inside GitHub or this browser file.
window.LIVING_PAGES_MENTOR_ENDPOINT = "https://us-central1-the-living-pages.cloudfunctions.net/livingPagesMentor";
