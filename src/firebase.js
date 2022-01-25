import firebase from "firebase"

const firebaseapp = firebase.initializeApp({
    apiKey: "AIzaSyB2i6A0Ew5JWCTLosSdvhthkEA98aDK-3s",
    authDomain: "instagram-clone-274c2.firebaseapp.com",
    databaseURL: "https://instagram-clone-274c2.firebaseio.com",
    projectId: "instagram-clone-274c2",
    storageBucket: "instagram-clone-274c2.appspot.com",
    messagingSenderId: "401379743471",
    appId: "1:401379743471:web:c4d95fd0caa2b1ed5bed1a",
    measurementId: "G-2PELNDRVPT"
  });

  const db = firebaseapp.firestore()
  const auth = firebaseapp.auth()
  const storage = firebaseapp.storage();

  export {db, auth, storage}