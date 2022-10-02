// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyAuoVEhf4xre6CdYTfbQHVW5CqhLfrla9U",
//     authDomain: "aida-ee7b2.firebaseapp.com",
//     projectId: "aida-ee7b2",
//     storageBucket: "aida-ee7b2.appspot.com",
//     messagingSenderId: "999852104709",
//     appId: "1:999852104709:web:8db75040bd3835735c506c",
//     measurementId: "G-GX3SBH0FRJ"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// const db = getFirestore(app);


// export { db }

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAfxSVIx7kz9X66DBrjicyaqka-D5XnqCE",
    authDomain: "aida-e5a96.firebaseapp.com",
    projectId: "aida-e5a96",
    storageBucket: "aida-e5a96.appspot.com",
    messagingSenderId: "402332928001",
    appId: "1:402332928001:web:cfa0a4ec8eb86e89129800",
    measurementId: "G-HQWGYSVQYQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
const auth = getAuth(app);


export { db, auth }
