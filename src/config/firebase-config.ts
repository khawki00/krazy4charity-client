
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyDuz2eNDlYMRsG6STFskXQaLgvDcECNdro",
  authDomain: "krazy4charity.firebaseapp.com",
  projectId: "krazy4charity",
  storageBucket: "krazy4charity.appspot.com",
  messagingSenderId: "87509982476",
  appId: "1:87509982476:web:b819ca77a8bce940affd29",
  measurementId: "G-M95B7YFVG7"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;
