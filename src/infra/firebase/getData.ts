import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from 'firebase/firestore';
import connection from './connection';
import { Rating } from '../../types/rating';

const getRating = async (idContent: string | undefined): Promise<Rating> => {
  const db = connection();
  const q = query(collection(db, 'rateIt'), where('id', '==', idContent));
  onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'modified') {
        change.doc.data();
      }
    });
  });
  const querySnapshot = await getDocs(q);
  const value: Rating = { no: 0, id: '3001', yes: 0 };
  querySnapshot.forEach((doc) => {
    value.id = doc.data().id;
    value.yes = doc.data().yes;
    value.no = doc.data().no;
    return value;
  });
  return value;
};

export default getRating;
