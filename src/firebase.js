// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBNVWNwcf_t6urDw_p8xZ5CJFeZ9usQsmE',
  authDomain: 'thirty-db.firebaseapp.com',
  projectId: 'thirty-db',
  storageBucket: 'thirty-db.firebasestorage.app',
  messagingSenderId: '109818146581',
  appId: '1:109818146581:web:ba0d7c8b310a024ac8431c',
  measurementId: 'G-029DE9FQDJ',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)

const db = getFirestore(app)

export { db }
