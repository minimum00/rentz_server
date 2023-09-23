
const {initializeApp} = require('firebase/app')
const {getFirestore} = require('firebase/firestore')
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCjzdMJWYqwUK3uedCrpQo-_F-6pAVm0Is",
    authDomain: "commerce-clothing.firebaseapp.com",
    projectId: "commerce-clothing",
    storageBucket: "commerce-clothing.appspot.com",
    messagingSenderId: "380064582771",
    appId: "1:380064582771:web:9880ce061b46b329ed6e06"
  };
  

var admin = require("firebase-admin");


var serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app);

module.exports = {app,db, auth}
