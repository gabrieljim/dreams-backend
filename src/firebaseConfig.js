const firebase = require("firebase/dist/index.node.cjs");
require("firebase/storage");

const firebaseConfig = {
	apiKey: "AIzaSyAGIdlaEtTeELEi7R7bgJY7NxBwexNABQ0",
	authDomain: "dreams-dea86.firebaseapp.com",
	databaseURL: "https://dreams-dea86.firebaseio.com",
	projectId: "dreams-dea86",
	storageBucket: "dreams-dea86.appspot.com",
	messagingSenderId: "777452603497",
	appId: "1:777452603497:web:4a574b9fef405859567af8",
	measurementId: "G-G2GV6ST3F3"
};

firebase.initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = firebase.storage();

module.exports = storage;
