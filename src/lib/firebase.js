import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
        apiKey: "AIzaSyBxoouH_KjwtNrbDBu3aLWVwBrlXMNzrBU",
        authDomain: "prompt-keeper-5d37a.firebaseapp.com",
        projectId: "prompt-keeper-5d37a",
        storageBucket: "prompt-keeper-5d37a.appspot.com",
        messagingSenderId: "142866051845",
        appId: "1:142866051845:web:2faff7cd0fc3b32bef3d6c",
        measurementId: "G-01CFJEF3Y2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
