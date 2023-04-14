import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';



const firebaseConfig = {
    apiKey: "AIzaSyB4zL6Uu8eQ1fH8AzNxR-zd5MUVxzKnZkU",
    authDomain: "reactnativefirebase-00000.firebaseapp.com",
    databaseURL: "https://reactnativefirebase-00000.firebaseio.com/",
    projectId: "reactnativefirebase-00000",
    storageBucket: "reactnativefirebase-00000.appspot.com",
    messagingSenderId: "000000000000000",
    appId: "1:000000000000000:web:000000000000000"
};

firebase.initializeApp(firebaseConfig);

export default firebase;


// database/firebaseDb.js
//import { initializeApp } from 'firebase/app';

/*
const firebaseConfig = {
    apiKey: "AIzaSyB4zL6Uu8eQ1fH8AzNxR-zd5MUVxzKnZkU",
    authDomain: "reactnativefirebase-00000.firebaseapp.com",
    databaseURL: "https://reactnativefirebase-00000.firebaseio.com/",
    projectId: "reactnativefirebase-00000",
    storageBucket: "reactnativefirebase-00000.appspot.com",
    messagingSenderId: "000000000000000",
    appId: "1:000000000000000:web:000000000000000"
};
const firebase = initializeApp(firebaseConfig);

export default firebase 
*/