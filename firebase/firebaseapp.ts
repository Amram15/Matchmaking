// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyD_Yq59j6mPEfXMP98thjGpdDe9zp7d-98",
	authDomain: "swe6813-matchmakeing.firebaseapp.com",
	databaseURL: "https://swe6813-matchmakeing-default-rtdb.firebaseio.com",
	projectId: "swe6813-matchmakeing",
	storageBucket: "swe6813-matchmakeing.appspot.com",
	messagingSenderId: "639795900649",
	appId: "1:639795900649:web:61a6cd238352deda140078",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export function that initializes Firebase
export const initFirebase = () => {
	return app;
};