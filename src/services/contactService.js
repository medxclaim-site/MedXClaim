import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const CONTACT_SUBMISSIONS_COLLECTION = 'contactSubmissions';

export const submitContactForm = async (payload) => {
  await addDoc(collection(db, CONTACT_SUBMISSIONS_COLLECTION), {
    ...payload,
    status: 'new',
    createdAt: serverTimestamp(),
  });
};

const AUTOREPLY_ENDPOINT =
  import.meta.env.VITE_CONTACT_AUTOREPLY_ENDPOINT || '/.netlify/functions/contact-autoreply';

export const sendContactAutoReply = async ({ name, email }) => {
  const response = await fetch(AUTOREPLY_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email }),
  });
  if (!response.ok) {
    throw new Error(`Auto-reply failed: ${response.status}`);
  }
};
