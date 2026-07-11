import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import firebaseConfig from '../firebase-applet-config.json';

// Defensive configuration fallback
const getSafeConfig = () => {
  if (!firebaseConfig || typeof firebaseConfig !== 'object' || !firebaseConfig.apiKey || firebaseConfig.apiKey.includes("YOUR_")) {
    console.warn("[Firebase] Invalid or template firebase-applet-config.json. Using fallback mock config for defensive rendering.");
    return {
      apiKey: "AIzaSyMockKeyForDefensiveRenderingOnly00",
      authDomain: "mock-applet.firebaseapp.com",
      projectId: "mock-applet-id",
      storageBucket: "mock-applet-id.firebasestorage.app",
      messagingSenderId: "123456789012",
      appId: "1:123456789012:web:mockappletid000000"
    };
  }
  return firebaseConfig;
};

let app;
let authInstance;

try {
  const config = getSafeConfig();
  if (getApps().length === 0) {
    app = initializeApp(config);
  } else {
    app = getApp();
  }
  authInstance = getAuth(app);
  
  // Explicitly set browser-local persistence for Firebase authentication
  setPersistence(authInstance, browserLocalPersistence).catch((err) => {
    console.error("[Firebase] Error setting local auth persistence:", err);
  });
} catch (error) {
  console.error("[Firebase] Severe initialization error caught defensively:", error);
  // Fallback dummy auth object that won't crash on basic properties
  authInstance = {
    currentUser: null,
    onAuthStateChanged: (callback: any) => {
      callback(null);
      return () => {};
    },
    signOut: () => Promise.resolve(),
  } as any;
}

export const auth = authInstance;

