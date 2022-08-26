import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";
import { GoogleAuthProvider } from "@firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCyinXScM7UQ4MvVb1SRGi3afcgCWBq4Yk",
  authDomain: "port-fd24b.firebaseapp.com",
  projectId: "port-fd24b",
  storageBucket: "port-fd24b.appspot.com",
  messagingSenderId: "113443327763",
  appId: "1:113443327763:web:71524145d981503b4794e6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

export { auth, storage };
