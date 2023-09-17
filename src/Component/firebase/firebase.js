// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore, collection, getDocs, addDoc, deleteDoc, doc, serverTimestamp} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    // apiKey: "AIzaSyB0lMzzac0wf6yR1CSLw5O7ckVrazUmHYk",
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "flowerapp-9eae7.firebaseapp.com",
    projectId: "flowerapp-9eae7",
    storageBucket: "flowerapp-9eae7.appspot.com",
    messagingSenderId: "1022411057539",
    appId: "1:1022411057539:web:80e7b87baee4d12c63aeb6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

// const db = firebase.firestore()
//
// db.collection('orders')

const colRefOrders = collection(db, 'orders')
const colRefNewsletter = collection(db, 'newsletter')

// getDocs(colRef)
//     .then((snapshot) => {
//         let orders = []
//         snapshot.docs.forEach((doc) => {
//             orders.push({...doc.data(), id: doc.id})
//         })
//         console.log(orders)
//     })
//     .catch((err) => {
//         console.log(err.message)
//     })

// addDoc(colRef, {
//     // price: "",
//     // extras: {
//     //     green: checked[0],
//     //     adding: checked[1],
//     //     homeDelivery: checked[2],
//     //     color: ""
//     // },
//     // timeToMake: "",
//     // flowerShopName: "test",
//     createdAt: serverTimestamp()
// })
//     .then(() => {
//     // wyczyszczenie wszystkich pól
//     })

// const docRef =doc(db, 'orders', orders.id)
//
// deleteDoc(docRef)
//     .then(() => {
//         order.reset()
//     })

