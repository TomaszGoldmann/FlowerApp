// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore, collection} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    // apiKey: process.env.REACT_APP_API_KEY,
    apiKey: "AIzaSyB0lMzzac0wf6yR1CSLw5O7ckVrazUmHYk",
    authDomain: "flowerapp-9eae7.firebaseapp.com",
    projectId: "flowerapp-9eae7",
    storageBucket: "flowerapp-9eae7.appspot.com",
    messagingSenderId: "1022411057539",
    appId: "1:1022411057539:web:80e7b87baee4d12c63aeb6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const colRefOrders = collection(db, 'orders')

