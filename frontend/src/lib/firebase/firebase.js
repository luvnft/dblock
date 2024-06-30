import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBDuBEs9nErcg5D48omv1vpL1JtJL4v0Fs",
    authDomain: "assignment-9c0a3.firebaseapp.com",
    projectId: "assignment-9c0a3",
    storageBucket: "assignment-9c0a3.appspot.com",
    messagingSenderId: "650217629944",
    appId: "1:650217629944:web:4618a6661999791d3df30d"
  };
  

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app)
  
  
  
  export { app, auth };