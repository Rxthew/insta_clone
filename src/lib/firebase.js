/* eslint-disable linebreak-style */
import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// import seed file //
// import { seedDatabase } from '../seed'; //

const config = {
  apiKey: 'AIzaSyAxIPJtt6V-qrFwVkgIBflyv-ybDmsuLNA',
  authDomain: 'instaclone-cb991.firebaseapp.com',
  projectId: 'instaclone-cb991',
  storageBucket: 'instaclone-cb991.appspot.com',
  messagingSenderId: '378878539203',
  appId: '1:378878539203:web:fdd0cea53a37cd87a5b976',
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// call seedfile here (just the one time) //
// seedDatabase(firebase); //

export { firebase, FieldValue };
