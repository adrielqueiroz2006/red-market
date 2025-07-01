import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBXV2qgPj4SioX2_yUkXhXBUsfoccADdWg',
  authDomain: 'red-market-project.firebaseapp.com',
  projectId: 'red-market-project',
  storageBucket: 'red-market-project.firebasestorage.app',
  messagingSenderId: '357437164496',
  appId: '1:357437164496:web:2ef418248f6e99480e07d5',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
