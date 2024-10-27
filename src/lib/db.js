import { 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  orderBy,
  updateDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';

const PROMPTS_COLLECTION = 'prompts';

export const addPromptToDb = async (promptData) => {
  try {
    const docRef = await addDoc(collection(db, PROMPTS_COLLECTION), {
      ...promptData,
      createdAt: serverTimestamp()
    });
    return { id: docRef.id, ...promptData };
  } catch (error) {
    console.error('Error adding prompt:', error);
    throw error;
  }
};

export const getPromptsFromDb = async () => {
  try {
    const q = query(collection(db, PROMPTS_COLLECTION), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting prompts:', error);
    throw error;
  }
};

export const deletePromptFromDb = async (promptId) => {
  try {
    await deleteDoc(doc(db, PROMPTS_COLLECTION, promptId));
  } catch (error) {
    console.error('Error deleting prompt:', error);
    throw error;
  }
};

export const updatePromptInDb = async (promptId, updates) => {
  try {
    const promptRef = doc(db, PROMPTS_COLLECTION, promptId);
    await updateDoc(promptRef, updates);
  } catch (error) {
    console.error('Error updating prompt:', error);
    throw error;
  }
};
