import {
  collection,
  doc,
  getDocs,
  query,
  writeBatch,
} from "firebase/firestore";

import { ICategory, ICategoryItem } from "@/models/Category";
import { db } from "./firebase";

export async function getCollectionAndDocuments(collectionKey: string) {
  const collectionRef = collection(db, collectionKey);
  const q = query(collectionRef);
  const { docs } = await getDocs(q);

  return docs.reduce<Record<string, ICategoryItem[]>>((acc, doc) => {
    const { title, items } = doc.data() as ICategory;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
}

export async function addCollectionAndDocuments(
  collectionKey: string,
  objectToAdd: { title: string }[],
) {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectToAdd.forEach(object => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
}
