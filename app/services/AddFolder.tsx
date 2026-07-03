import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/FirebaseConfig";

export const addFolderIcon = async () => {
    try {
        await addDoc(collection(db, "Icons"), {
            name: "New Folder",
            icon: "bxf bx-folder",
            createdAt: serverTimestamp(),
        });
    } catch (err) {
        console.error(err);
    }
};