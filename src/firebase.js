import firebase from "firebase/app"
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBBJXvjq_Xl6k-0q5SAVlqQS9y0jsOVNP8",
  authDomain: "fitlink-dev.firebaseapp.com",
  databaseURL: "https://fitlink-dev.firebaseio.com",
  projectId: "fitlink-dev",
  storageBucket: "fitlink-dev.appspot.com",
  messagingSenderId: "664939368549",
  appId: "1:664939368549:web:4eb906ae4d942ad0f3768c",
}
firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export default firebase
