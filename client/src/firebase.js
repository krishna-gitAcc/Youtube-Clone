import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBicVCNbuvIeg1gJFo2etx4zT9y_KDlLU4",
  authDomain: "videotube-ff346.firebaseapp.com",
  projectId: "videotube-ff346",
  storageBucket: "videotube-ff346.appspot.com",
  messagingSenderId: "643181953281",
  appId: "1:643181953281:web:a7fcaa3f28197f6c765b00",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;
