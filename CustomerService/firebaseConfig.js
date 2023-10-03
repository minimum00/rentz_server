// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore } from 'firebase/firestore'
// import { getStorage } from 'firebase/storage'

const {initializeApp} = require('firebase/app')
const {getFirestore} = require('firebase/firestore')
const {getStorage} = require('firebase/storage')
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCGtp3SgFG0JxrdIIEeSev5rGfISAbcAE",
  authDomain: "testserverdatabase.firebaseapp.com",
  projectId: "testserverdatabase",
  storageBucket: "testserverdatabase.appspot.com",
  messagingSenderId: "304995631638",
  appId: "1:304995631638:web:d50d2030b2b60c3b1feb37"
};

var admin = require("firebase-admin");

var serviceAccount = require("./ServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const storage = getStorage(app)

module.exports = {app,db,storage}
// export const storage = getStorage(app)