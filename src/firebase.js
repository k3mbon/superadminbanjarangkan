import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyAA0N8phmD_LQcqu1XxqZX07mxGqj0dy_k",
    authDomain: "sman1banjarangkan-d25d1.firebaseapp.com",
    projectId: "sman1banjarangkan-d25d1",
    storageBucket: "sman1banjarangkan-d25d1.appspot.com",
    messagingSenderId: "73320561622",
    appId: "1:73320561622:web:6d7a601bcba1609e788277",
    measurementId: "G-7PBK45ZWXX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
export default app;
