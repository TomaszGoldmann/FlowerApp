// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "flowerapp-9eae7.firebaseapp.com",
    projectId: "flowerapp-9eae7",
    storageBucket: "flowerapp-9eae7.appspot.com",
    messagingSenderId: "1022411057539",
    appId: "1:1022411057539:web:80e7b87baee4d12c63aeb6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);