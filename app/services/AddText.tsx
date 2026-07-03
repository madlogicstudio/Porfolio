import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/FirebaseConfig";

export const addTextDocument = async () => {
    try {
        await addDoc(collection(db, "Icons"), {
            name: "New Text Document",
            icon: "bxf bx-file",
            createdAt: serverTimestamp(),
        });
    } catch (err) {
        console.error(err);
    }
};