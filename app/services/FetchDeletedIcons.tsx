import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../lib/FirebaseConfig";
import { DesktopIcon } from "./FetchIcons";

export default function useFetchDeletedIcons() {
  const [icons, setIcons] = useState<DesktopIcon[]>([]);

  useEffect(() => {
    const deletedIconsRef = collection(db, "DeletedIcons");
    const q = query(deletedIconsRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as DesktopIcon[];

      setIcons(data);
    });

    return () => unsubscribe();
  }, []);

  return icons;
}