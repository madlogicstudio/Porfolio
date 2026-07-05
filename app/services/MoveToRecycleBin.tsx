import {
    doc,
    getDoc,
    setDoc,
    deleteDoc,
} from "firebase/firestore";
import { db } from "../lib/FirebaseConfig";

export const MoveToRecycleBin = async (id: string) => {
    try {
        const iconRef = doc(db, "Icons", id);
        const iconSnap = await getDoc(iconRef);

        if (!iconSnap.exists()) return;

        const data = iconSnap.data();

        await setDoc(doc(db, "DeletedIcons", id), {
            ...data,
            deletedAt: new Date(),
        });

        await deleteDoc(iconRef);

    } catch (err) {
        console.error(err);
    }
};