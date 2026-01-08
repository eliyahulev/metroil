import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "REMOVED",
  authDomain: "REMOVED",
  projectId: "REMOVED",
  storageBucket: "REMOVED",
  messagingSenderId: "REMOVED",
  appId: "1:REMOVED:web:30bae075044ac2a7a3a701",
  measurementId: "REMOVED"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)
