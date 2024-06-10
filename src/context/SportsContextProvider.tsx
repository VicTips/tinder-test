import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { UserContext } from "./AuthContext";

const SportContext = createContext(null);

const SportContextProvider = ({ children }: any) => {
  const [sports, setSports] = useState([]);
  const [index, setIndex] = useState(
    !localStorage.getItem("index") ? 0 : parseInt(localStorage.getItem("index"))
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(
          "https://dff6kz4nmb.execute-api.us-east-1.amazonaws.com/development/test-front"
        );
        setSports(response.sports);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const nextSport = () => {
    setIndex(
      index === sports.length - 1 ? index - sports.length + 1 : index + 1
    );
  };

  const addSportLike = (userId: string, like: boolean) => {
    const sportLikesCol = collection(db, "sportLikes");
    addDoc(sportLikesCol, {
      userId,
      like,
      sportId: sports[index].idSport,
      createdAt: new Date(),
    });
    nextSport();
  };

  localStorage.setItem("index", index.toString());

  const { user }: any = useContext(UserContext);

  const getSportLikes = async (userId: string) => {
    const sportLikesRef = collection(db, "sportLikes");
    const q = query(
      sportLikesRef,
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
    const qs = await getDocs(q);
    const sportLikes: any = [];
    qs.forEach((doc) => {
      sportLikes.push({ id: doc.id, ...doc.data() });
    });
    return sportLikes;
  };

  const [loadingSportLikes, setLoadingSportLikes] = useState(true);
  const [sportLikes, setSportLikes] = useState([]);

  useEffect(() => {
    if (user) {
      getSportLikes(user.uid)
        .then(setSportLikes)
        .catch((error) => {
          console.log(error);
        })
        .finally(() => setLoadingSportLikes(false));
    }
  }, [user, index]);

  const values = {
    sports: sports,
    index: index,
    addSportLike: addSportLike,
    loadingSportLikes,
    sportLikes,
  };

  return (
    <SportContext.Provider value={values}>
      {!loading && children}
    </SportContext.Provider>
  );
};

export { SportContextProvider, SportContext };
