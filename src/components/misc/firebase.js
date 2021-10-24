import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const app = initializeApp({
  apiKey: "AIzaSyCrNSP56Co1Pt0qrnPpTY-x4rGzeyy9rng",
  authDomain: "insightful-80425.firebaseapp.com",
  projectId: "insightful-80425",
  storageBucket: "insightful-80425.appspot.com",
  messagingSenderId: "123863237410",
  appId: "1:123863237410:web:a2aa0f6d3978a8e7a7db7b",
  measurementId: "G-C2QXWECFLZ"
});

export const auth = getAuth(app) 
export default app