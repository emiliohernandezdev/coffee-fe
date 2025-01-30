import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyBUM2tMpvminFX_xJawdCnB3tnbmSOmnXE",
    authDomain: "coffeeshopapp-44b35.firebaseapp.com",
    projectId: "coffeeshopapp-44b35",
    storageBucket: "coffeeshopapp-44b35.firebasestorage.app",
    messagingSenderId: "777400333924",
    appId: "1:777400333924:web:1d7b45bb11a271a82ad171",
    measurementId: "G-6DGVWFWSE7"
  };


  const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app);
  export const storage = getStorage(app);
  export const analytics = getAnalytics(app);
  export const messaging = getMessaging(app);
  export default app;