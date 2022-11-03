import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTHYzxpS0IBcYqBj0JxLWQ-CX1ifSlLmI",
  authDomain: "gym-management-7a3e5.firebaseapp.com",
  projectId: "gym-management-7a3e5",
  storageBucket: "gym-management-7a3e5.appspot.com",
  messagingSenderId: "171444072130",
  appId: "1:171444072130:web:546e130fd3fb364ce9155b",
  measurementId: "G-RLJPSCNT3Q",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);
