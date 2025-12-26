import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyACbFVHxk1ElPgntV8sso3492nr2ZMlEV4",
  authDomain: "react-netflix-clone-a34e3.firebaseapp.com",
  projectId: "react-netflix-clone-a34e3",
  storageBucket: "react-netflix-clone-a34e3.firebasestorage.app",
  messagingSenderId: "530555676388",
  appId: "1:530555676388:web:b4b9963b221e3a3a2d2ef1",
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
