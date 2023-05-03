import { collection, addDoc } from 'firebase/firestore';
import connection from './connection';

const create = async (idTopic: string) => {
  const db = connection();
  try {
    await addDoc(collection(db, 'rateIt'), {
      id: idTopic,
      yes: 0,
      no: 0,
    });
    console.log('Document written with ID: ', idTopic);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export default create;
