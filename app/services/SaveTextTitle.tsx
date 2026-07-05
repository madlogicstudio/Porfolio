import { doc, updateDoc } from "firebase/firestore";
import { db } from "../lib/FirebaseConfig";

export const saveTextTitle = async (
    id: string,
    name: string
) => {
    try {
        await updateDoc(doc(db, "Icons", id), {
            name,
            updatedAt: new Date(),
        });
    } catch (err) {
        console.error(err);
    }
};