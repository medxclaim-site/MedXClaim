import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';

const AGENCIES = 'agencies';

export const subscribeToAgencies = (onData, onError) => {
  const q = query(collection(db, AGENCIES), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snap) => onData(snap.docs.map((d) => ({ id: d.id, ...d.data() }))), onError);
};

export const subscribeToAgency = (agencyId, onData, onError) =>
  onSnapshot(
    doc(db, AGENCIES, agencyId),
    (snap) => onData(snap.exists() ? { id: snap.id, ...snap.data() } : null),
    onError,
  );

export const createAgency = (data) =>
  addDoc(collection(db, AGENCIES), {
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    status: 'active',
    pendingAuthorizations: 0,
    createdAt: serverTimestamp(),
  });

export const updateAgency = (agencyId, data) =>
  updateDoc(doc(db, AGENCIES, agencyId), { ...data, updatedAt: serverTimestamp() });

export const deleteAgency = (agencyId) => deleteDoc(doc(db, AGENCIES, agencyId));
