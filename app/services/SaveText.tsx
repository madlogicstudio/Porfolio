import { doc, updateDoc } from "firebase/firestore";
import { db } from "../lib/FirebaseConfig";

export const saveTextDocument = async (
    id: string,
    content: string
) => {
    try {
        await updateDoc(doc(db, "Icons", id), {
            content,
            updatedAt: new Date(),
        });
    } catch (err) {
        console.error(err);
    }
};