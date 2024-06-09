import { useEffect } from "react";
import { app } from "../firebase/config";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

function getSportLikes() {
  const db = getFirestore(app);
  const sportLikesRef = collection(db, "sportLikes");
  const q = query(sportLikesRef);
  onSnapshot(q, (qs) => {
    console.log(qs);
  });
}

function History() {
  useEffect(() => {
    getSportLikes();
  }, []);
  return (
    <>
      <h1>History</h1>
    </>
  );
}
export default History;
