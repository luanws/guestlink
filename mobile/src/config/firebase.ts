import { getAnalytics } from "firebase/analytics"
import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyC5NrQ76RhOELP6IFC-eLNGn7BiKQIt8cc",
  authDomain: "invitation-maker-ee874.firebaseapp.com",
  projectId: "invitation-maker-ee874",
  storageBucket: "invitation-maker-ee874.appspot.com",
  messagingSenderId: "308707899828",
  appId: "1:308707899828:web:dba1d8a0f30f1b28ef5ae1",
  measurementId: "G-1QRZK2WKJM"
}

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)