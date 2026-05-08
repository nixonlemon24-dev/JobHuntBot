import { useEffect } from "react";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import app from "./firebase";

const db = getFirestore(app);

function App() {
  useEffect(() => {
    const testFirebase = async () => {
      try {
        // WRITE a test document
        await setDoc(doc(db, "test", "connection"), {
          status: "connected",
          timestamp: new Date().toISOString()
        });
        console.log("✅ Write successful!");

        // READ it back
        const docSnap = await getDoc(doc(db, "test", "connection"));
        if (docSnap.exists()) {
          console.log("✅ Read successful! Data:", docSnap.data());
        }
      } catch (error) {
        console.error("❌ Firebase error:", error);
      }
    };

    testFirebase();
  }, []);

  return <div>Check the browser console for Firebase test results</div>;
}