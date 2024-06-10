import { useContext, useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, query, getDocs, where } from "firebase/firestore";
import styled from "styled-components";
import { UserContext } from "../context/AuthContext";

const Title = styled.h1`
  font-weight: 700;
  font-size: 42px;
  line-height: 51.25px;
  letter-spacing: -0.05rem;
  color: ${(props) => props.theme.colors.textPrimary};
`;

const getSportLikes = async (userId: string) => {
  const sportLikesRef = collection(db, "sportLikes");
  const q = query(sportLikesRef, where("userId", "==", userId));
  const qs = await getDocs(q);
  const sportLikes: any = [];
  qs.forEach((doc) => {
    sportLikes.push({ id: doc.id, ...doc.data() });
  });
  return sportLikes;
};

const History = () => {
  const { user }: any = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [sportLikes, setSportLikes] = useState([]);
  useEffect(() => {
    getSportLikes(user.uid)
      .then(setSportLikes)
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, []);
  console.log(sportLikes);
  return (
    <>
      <Title>History</Title>
      {loading ? "Spinner" : <p>Hola</p>}
    </>
  );
};
export default History;
