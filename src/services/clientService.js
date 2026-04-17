import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';

const CLIENTS = 'clients';

export const subscribeToClients = (agencyId, onData, onError) => {
  const q = query(collection(db, CLIENTS), where('agencyId', '==', agencyId));
  return onSnapshot(
    q,
    (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      list.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
      onData(list);
    },
    onError,
  );
};

export const createClient = (agencyId, name) =>
  addDoc(collection(db, CLIENTS), {
    name: name.trim(),
    agencyId,
    createdAt: serverTimestamp(),
  });

export const updateClient = (clientId, data) =>
  updateDoc(doc(db, CLIENTS, clientId), { ...data, updatedAt: serverTimestamp() });

export const deleteClient = (clientId) => deleteDoc(doc(db, CLIENTS, clientId));
