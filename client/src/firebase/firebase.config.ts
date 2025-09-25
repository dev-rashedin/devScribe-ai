// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig: FirebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY as string,
  authDomain: import.meta.env.VITE_AUTHDOMAIN as string,
  projectId: import.meta.env.VITE_PROJECTID as string,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET as string,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID as string,
  appId: import.meta.env.VITE_APPID as string,
  measurementId: import.meta.env.VITE_MEASUREMENTID as string,
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

const auth: Auth = getAuth(app);

export const analytics = getAnalytics(app);

export default auth;



