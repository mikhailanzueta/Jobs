// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup, applyActionCode, Auth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
auth.languageCode = 'en'
const provider = new GoogleAuthProvider();

// // Send sign in link to users email:
  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'http://localhost:5173/', // This is the continueURL
    handleCodeInApp: true,
  };


function handleVerifyEmail(auth: Auth, actionCode: string, onSuccess: () => void) {
  // Localize the UI to the selected language as determined by the lang
  // parameter.
  // Try to apply the email verification code.
  applyActionCode(auth, actionCode)
  .then(() => {
    // Email address has been verified.
    console.log('Email has been verified!')
    if (onSuccess) onSuccess()

    // TODO: Display a confirmation message to the user.
    // You could also provide the user with a link back to the app.

    // TODO: If a continue URL is available, display a button which on
    // click redirects the user back to the app via continueUrl with
    // additional state determined from that URL's parameters.
  }).catch((error) => {
    console.error('Verification link has expired, Please verify your email again.', error)
    // Code is invalid or expired. Ask the user to verify their email address
    // again.
  });
}


// Handle google pop up sign in:
const handleGoogleSignIn = async() => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log('User info: ', result.user)
    alert('User successfully signed in!')
  } catch (error) {
    console.log('Google sign in error: ', error)
  }
}

export { app, auth, provider, firebaseConfig, signInWithPopup, handleGoogleSignIn, handleVerifyEmail, actionCodeSettings  };
