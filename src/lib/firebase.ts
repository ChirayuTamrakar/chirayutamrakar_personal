import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  addDoc,
  serverTimestamp,
  type Firestore
} from 'firebase/firestore';
import { ESSAYS, type Essay } from '../data/content';

// Environment variable resolution supporting both NEXT_PUBLIC_ and VITE_ prefixes
const getEnv = (key: string): string => {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    const viteKey = `VITE_${key}`;
    const nextKey = `NEXT_PUBLIC_${key}`;
    return (
      (import.meta.env[viteKey] as string) ||
      (import.meta.env[nextKey] as string) ||
      (import.meta.env[key] as string) ||
      ''
    );
  }
  return '';
};

const firebaseConfig = {
  apiKey: getEnv('FIREBASE_API_KEY'),
  authDomain: getEnv('FIREBASE_AUTH_DOMAIN'),
  projectId: getEnv('FIREBASE_PROJECT_ID'),
  storageBucket: getEnv('FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getEnv('FIREBASE_MESSAGING_SENDER_ID'),
  appId: getEnv('FIREBASE_APP_ID'),
  measurementId: getEnv('FIREBASE_MEASUREMENT_ID')
};

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
export let isFirebaseConfigured = false;

if (firebaseConfig.apiKey && firebaseConfig.projectId) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    db = getFirestore(app);
    isFirebaseConfigured = true;
  } catch (error) {
    console.warn('Firebase initialization notice (falling back to local state):', error);
  }
}

// Local storage keys for caching and offline state
const LOCAL_VIEWS_KEY = 'akshay_essay_views';
const LOCAL_MESSAGES_KEY = 'akshay_contact_messages';

const getLocalViews = (): Record<string, number> => {
  try {
    const raw = localStorage.getItem(LOCAL_VIEWS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const setLocalViews = (views: Record<string, number>) => {
  try {
    localStorage.setItem(LOCAL_VIEWS_KEY, JSON.stringify(views));
  } catch {
    // Ignore storage errors
  }
};

/**
 * Fetch essays with real-time or local view counts
 */
export async function getEssaysWithViews(): Promise<Essay[]> {
  const localViews = getLocalViews();

  if (isFirebaseConfigured && db) {
    try {
      const essaysRef = collection(db, 'essays');
      const snapshot = await getDocs(essaysRef);
      if (!snapshot.empty) {
        const firestoreEssays: Essay[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          firestoreEssays.push({
            id: docSnap.id,
            slug: data.slug || docSnap.id,
            title: data.title || '',
            date: data.date || '',
            readTime: data.readTime || '5 min read',
            initialViews: (data.views ?? localViews[docSnap.id] ?? 1000),
            initialLikes: data.likes ?? 50,
            content: data.content || []
          });
        });
        return firestoreEssays;
      }
    } catch (err) {
      console.warn('Firestore fetch essays notice; using local fallback:', err);
    }
  }

  // Local fallback: map static essays and merge local view overrides
  return ESSAYS.map((essay) => ({
    ...essay,
    initialViews: essay.initialViews + (localViews[essay.id] || 0)
  }));
}

/**
 * Increment view count for an essay
 */
export async function incrementEssayView(essayId: string): Promise<number> {
  const localViews = getLocalViews();
  const currentLocal = localViews[essayId] || 0;
  localViews[essayId] = currentLocal + 1;
  setLocalViews(localViews);

  if (isFirebaseConfigured && db) {
    try {
      const essayDocRef = doc(db, 'essays', essayId);
      const snap = await getDoc(essayDocRef);
      if (snap.exists()) {
        await updateDoc(essayDocRef, {
          views: increment(1)
        });
        return snap.data().views + 1;
      } else {
        await setDoc(essayDocRef, {
          views: 1,
          lastViewed: serverTimestamp()
        }, { merge: true });
        return 1;
      }
    } catch (err) {
      console.warn('Firestore view increment notice:', err);
    }
  }

  const baseEssay = ESSAYS.find((e) => e.id === essayId);
  return (baseEssay?.initialViews || 0) + localViews[essayId];
}

/**
 * Save contact message to Firestore messages collection or localStorage
 */
export async function submitContactMessage(messageData: {
  name: string;
  email: string;
  message: string;
}): Promise<{ success: boolean; id?: string }> {
  // Store locally
  try {
    const raw = localStorage.getItem(LOCAL_MESSAGES_KEY);
    const messages = raw ? JSON.parse(raw) : [];
    messages.push({
      ...messageData,
      id: `msg_${Date.now()}`,
      createdAt: new Date().toISOString()
    });
    localStorage.setItem(LOCAL_MESSAGES_KEY, JSON.stringify(messages));
  } catch (e) {
    console.error('LocalStorage write error', e);
  }

  if (isFirebaseConfigured && db) {
    try {
      const messagesRef = collection(db, 'messages');
      const docRef = await addDoc(messagesRef, {
        ...messageData,
        createdAt: serverTimestamp()
      });
      return { success: true, id: docRef.id };
    } catch (err) {
      console.warn('Firestore message save error:', err);
    }
  }

  return { success: true, id: `local_${Date.now()}` };
}
