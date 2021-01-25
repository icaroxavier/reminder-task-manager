import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBGmEgvJFhNQfHMLAmSi5h2Ft59UVDoe60",
  authDomain: "task-manager-7ce93.firebaseapp.com",
  projectId: "task-manager-7ce93",
  storageBucket: "task-manager-7ce93.appspot.com",
  messagingSenderId: "659705750561",
  appId: "1:659705750561:web:00c5b9fe0d8738c40aef60"
};
// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);