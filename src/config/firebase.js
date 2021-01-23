import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCouKXLRbKdBsWS4GBj4kX4Two7WrrhZPM",
  authDomain: "grupos-atividades.firebaseapp.com",
  projectId: "grupos-atividades",
  storageBucket: "grupos-atividades.appspot.com",
  messagingSenderId: "99244357935",
  appId: "1:99244357935:web:5ce36110d067564acc89da"
};
// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);