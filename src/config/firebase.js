import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDuyMKyDDNtEQZ05sydvgRczjoTLr3dyDA",
  authDomain: "reminder-a9aac.firebaseapp.com",
  projectId: "reminder-a9aac",
  storageBucket: "reminder-a9aac.appspot.com",
  messagingSenderId: "1027652803442",
  appId: "1:1027652803442:web:266e015485f3a5f5875beb"
};
// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
