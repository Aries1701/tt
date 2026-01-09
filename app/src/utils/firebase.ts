import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyACbFVHxk1ElPgntV8sso3492nr2ZMlEV4",
  authDomain: "react-netflix-clone-a34e3.firebaseapp.com",
  projectId: "react-netflix-clone-a34e3",
};

const app =
  getApps().length > 0
    ? getApp()
    : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
