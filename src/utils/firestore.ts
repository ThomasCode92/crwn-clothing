import { collection, doc, writeBatch } from "firebase/firestore";
import { db } from "./firebase";

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
