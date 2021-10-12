import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyCrNSP56Co1Pt0qrnPpTY-x4rGzeyy9rng",
  authDomain: "insightful-80425.firebaseapp.com",
  projectId: "insightful-80425",
  storageBucket: "insightful-80425.appspot.com",
  messagingSenderId: "123863237410",
  appId: "1:123863237410:web:a2aa0f6d3978a8e7a7db7b",
  measurementId: "G-C2QXWECFLZ"
});

export const auth = app.auth() 
export default app