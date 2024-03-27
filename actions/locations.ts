// actions/firebase.js
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { firebaseApp } from "@/lib/dbConfig";

export const submitLocation = async ({
  name,
  lat,
  lng,
}: {
  name: string;
  lat: string;
  lng: string;
}) => {
  const firestore = getFirestore(firebaseApp);

  try {
    await addDoc(collection(firestore, "stations"), {
      name,
      lat: parseFloat(lat),
      lng: parseFloat(lng),
    });

    return { success: "Location submitted successfully!" };
  } catch (error) {
    console.error("Error adding location to Firestore:", error);
    return { error: "Failed to add location. Please try again later." };
  }
};
