import firebase from "firebase";
// import { AsyncStorage } from 'react-native'

class FirebaseServ {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyBTmreHCULJtvpTC8Y2sqeyCcAiWac-BIg",
        authDomain: "lilia-connection.firebaseapp.com",
        databaseURL: "https://lilia-connection.firebaseio.com",
        projectId: "lilia-connection",
        storageBucket: "",
        messagingSenderId: "191491876389",
        appId: "1:191491876389:web:b29a2a9a424fe6e50f81cc"
      });
    }
  }
}

const firebaseServ = new FirebaseServ();
export default firebaseServ;
