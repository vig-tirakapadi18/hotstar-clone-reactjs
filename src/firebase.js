import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCVczovu2iIFpNKsXZHenUjG4u_kWgggzk",
    authDomain: "hotstar-clone-react-5e15b.firebaseapp.com",
    databaseURL: "https://hotstar-clone-react-5e15b-default-rtdb.firebaseio.com",
    projectId: "hotstar-clone-react-5e15b",
    storageBucket: "hotstar-clone-react-5e15b.appspot.com",
    messagingSenderId: "915250871637",
    appId: "1:915250871637:web:a0e0d54cb72eaf82ed83dc"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const storage = getStorage(firebaseApp);

export { auth, provider, storage };
export default db;