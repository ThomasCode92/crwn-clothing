import {
  collection,
  doc,
  getDocs,
  query,
  writeBatch,
} from "firebase/firestore";

import { Category } from "@/models/Category";
import { db } from "@/utils/firebase";

type ObjectToAdd = { title: string };

export async function getCollectionAndDocuments(
  collectionKey: string,
): Promise<Category[]> {
  const collectionRef = collection(db, collectionKey);
  const q = query(collectionRef);
  const { docs } = await getDocs(q);

  return docs.map(doc => doc.data() as Category);
}

export async function addCollectionAndDocuments<T extends ObjectToAdd>(
  collectionKey: string,
  objectToAdd: T[],
): Promise<void> {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectToAdd.forEach(object => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
}
