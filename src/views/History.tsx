import { useContext } from "react";
import styled from "styled-components";
import { SportContext } from "../context/SportsContextProvider";

const Title = styled.h1`
  font-weight: 700;
  font-size: 42px;
  line-height: 51.25px;
  letter-spacing: -0.05rem;
  color: ${(props) => props.theme.colors.textPrimary};
`;

const History = () => {
  const { loadingSportLikes, sportLikes }: any = useContext(SportContext);
  console.log(sportLikes);

  return (
    <>
      <Title>History</Title>
      {loadingSportLikes ? "Spinner" : <p>Hola</p>}
    </>
  );
};
export default History;
