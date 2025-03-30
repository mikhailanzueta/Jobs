// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink, getAdditionalUserInfo } from "firebase/auth"
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

// Send sign in link to users email:
const tryEmailSignIn = async(email: string) => {
  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'http://localhost:5173/',
    handleCodeInApp: true,
  };
  await sendSignInLinkToEmail(auth, email, actionCodeSettings)
  .then(() => {
    alert('Verification link sent to your email!')
    window.localStorage.setItem('emailForSignIn', email);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage)
  })
}

// Complete the sign in after user clicks the confirmation link:
const completeSignIn = async() => {
  if (isSignInWithEmailLink(auth, window.location.href)) {
    let email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
      email = window.prompt('Please provide your email for confirmation');
    } 
    if (email) {
      try {
          const result = await signInWithEmailLink(auth, email, window.location.href)
          window.localStorage.removeItem('emailForSignIn');
          getAdditionalUserInfo(result)
          console.log(getAdditionalUserInfo)
      } catch(error) {
          console.error('There was an error signing in: ', error)
      }
    }
  }
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

// Firebase email authentication link:


export { auth, provider, signInWithPopup, handleGoogleSignIn, tryEmailSignIn, completeSignIn, sendSignInLinkToEmail };
