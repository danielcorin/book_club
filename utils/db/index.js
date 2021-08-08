import firebase from 'firebase/app'
import 'firebase/firestore'

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: "our-bookclub.appspot.com",
  messagingSenderId: "168703728264",
  appId: "1:168703728264:web:ba59790ffaa7b42b045d3d",
  measurementId: "G-2241YXHVNM"
}

if (!firebase.apps.length) {
  try {
    firebase.initializeApp(config)
  } catch (error) {
    console.log('Firebase admin initialization error', error.stack);
  }
}
export default firebase.firestore()
