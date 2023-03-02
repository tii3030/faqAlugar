import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const connection = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyDcAuA49oYwEaBv6e9OV-W8DrrkCq8sDh4',
    authDomain: 'faqalugar-8cc0f.firebaseapp.com',
    projectId: 'faqalugar-8cc0f',
    storageBucket: 'faqalugar-8cc0f.appspot.com',
    messagingSenderId: '948157404759',
    appId: '1:948157404759:web:a3357ed87bdda68607b512',
    measurementId: 'G-ZBR7CJJCP4',
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  return db;
};

export default connection;
