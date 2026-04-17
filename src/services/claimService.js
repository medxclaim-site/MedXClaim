import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  limit,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';

const CLAIMS = 'claims';
const CLAIM_QUERY_LIMIT = 500; // Limit per query for performance

export const subscribeToClaimsByAgency = (agencyId, onData, onError) => {
  const q = query(
    collection(db, CLAIMS),
    where('agencyId', '==', agencyId),
    limit(CLAIM_QUERY_LIMIT),
  );
  return onSnapshot(
    q,
    (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      list.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
      onData(list);
    },
    onError,
  );
};

export const subscribeToClaimsByClient = (clientId, onData, onError) => {
  const q = query(
    collection(db, CLAIMS),
    where('clientId', '==', clientId),
    limit(CLAIM_QUERY_LIMIT),
  );
  return onSnapshot(
    q,
    (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      list.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
      onData(list);
    },
    onError,
  );
};

export const createClaim = (data) =>
  addDoc(collection(db, CLAIMS), {
    clientId: data.clientId,
    agencyId: data.agencyId,
    date: data.date,
    hours: Number(data.hours) || 0,
    amount: Number(data.amount) || 0,
    status: data.status || 'pending',
    customStatus: data.customStatus || '',
    createdAt: serverTimestamp(),
  });

export const updateClaim = (claimId, data) =>
  updateDoc(doc(db, CLAIMS, claimId), { ...data, updatedAt: serverTimestamp() });

export const deleteClaim = (claimId) => deleteDoc(doc(db, CLAIMS, claimId));
