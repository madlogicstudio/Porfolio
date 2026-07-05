import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../lib/FirebaseConfig";

export type DesktopIcon = {
  id: string;
  name: string;
  icon: string;
  content?: string;
  createdAt: any;
  updatedAt?: any;
};

export default function useFetchIcons() {
  const [icons, setIcons] = useState<DesktopIcon[]>([]);

  useEffect(() => {
    const iconsRef = collection(db, "Icons");
    const q = query(iconsRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        })) as DesktopIcon[];

        setIcons(data);
    });

    return () => unsubscribe();
  }, []);

  return icons;
}