import {
  getFirestore,
  collection,
  query,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import { firebaseApp } from "@/lib/dbConfig";

// Define interfaces for your data
interface User {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  nicNo: string;
  imageUrl: string;
}

interface Station {
  name: string;
  location: { lat: number; lng: number };
}

interface UserLocation {
  email: string;
  location: { lat: number; lng: number };
}

const useFirebaseData = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [stations, setStations] = useState<Station[]>([]);
  const [userLocations, setUserLocations] = useState<UserLocation[]>([]);

  useEffect(() => {
    const firestore = getFirestore(firebaseApp);
    const database = getDatabase(firebaseApp);

    const fetchFirestoreData = async () => {
      // Make fetches asynchronous
      try {
        const usersSnapshot = await getDocs(collection(firestore, "users"));
        setUsers(
          usersSnapshot.docs.map((doc) => ({
            ...(doc.data() as User),
            id: doc.id,
          }))
        );

        // ... similar fetches for stations and cards
      } catch (error) {
        console.error(
          "Error fetching Firestore data:",
          (error as Error).message
        );
      }
    };

    const fetchRealtimeDatabaseData = () => {
      const userLocationsRef = ref(database, "user_locations");

      onValue(
        userLocationsRef,
        (snapshot) => {
          if (snapshot.exists()) {
            // Check for data existence
            setUserLocations(
              Object.entries(snapshot.val()).map(([email, location]) => ({
                email,
                location: location as { lat: number; lng: number },
              }))
            );
          }
        },
        { onlyOnce: true }
      );
    };

    fetchFirestoreData();
    fetchRealtimeDatabaseData();
  }, []);

  return { users, stations, userLocations };
};

export default useFirebaseData;
