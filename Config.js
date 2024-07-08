import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDKJOfIP4EHnUqyGf6nil0_xI9OXSMAZuM",
  authDomain: "jobfindingapp-62d75.firebaseapp.com",
  projectId: "jobfindingapp-62d75",
  storageBucket: "jobfindingapp-62d75.appspot.com",
  messagingSenderId: "225981175744",
  appId: "1:225981175744:web:505645ca7e488b4ee11a25",
  measurementId: "G-X5B6JSZ7JW",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
