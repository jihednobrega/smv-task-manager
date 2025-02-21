import { initializeApp } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCxVzG4qGLtm9_wFFx6hWQZA7vj8_-V3nA',
  authDomain: 'task-manager-3146e.firebaseapp.com',
  projectId: 'task-manager-3146e',
  storageBucket: 'task-manager-3146e.firebasestorage.app',
  messagingSenderId: '552941835415',
  appId: '1:552941835415:web:aff03554ddd0e1fa6e45d2',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

export { auth, googleProvider, signInWithPopup, signOut }
