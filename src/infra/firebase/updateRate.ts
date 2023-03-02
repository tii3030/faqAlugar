import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  increment,
  doc,
} from 'firebase/firestore';
import connection from './connection';

const updateRate = async (idContent: string | undefined, type: string) => {
  const db = connection();
  const q = query(collection(db, 'rateIt'), where('id', '==', idContent));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (docs) => {
    const washingtonRef = doc(db, 'rateIt', docs.id);
    await updateDoc(washingtonRef, {
      yes: type === 'yes' ? increment(1) : docs.data().yes,
      no: type === 'no' ? increment(1) : docs.data().no,
    }).then(() => {
      return true;
    });
  });
  return true;
};

export default updateRate;
