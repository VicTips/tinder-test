import { useContext } from "react";
import styled, { keyframes } from "styled-components";
import { SportContext } from "../context/SportsContextProvider";
import LeftArrowIcon from "../components/icons/LeftArrowIcon";
import { useNavigate } from "react-router-dom";
import SportLikes from "../components/SportLikes";

const Title = styled.h1`
  font-weight: 700;
  font-size: 42px;
  line-height: 51.25px;
  letter-spacing: -0.05rem;
  color: ${(props) => props.theme.colors.textPrimary};
  text-align: start;
  width: 100%;
  margin: 18px 0 0;
`;

const Text = styled.p`
  opacity: 0.8;
  font-family: "Epilogue", sans-serif;
  font-size: 18px;
  line-height: 26.64px;
  color: ${(props) => props.theme.colors.textSecondary};
  width: 100%;
  max-width: 322px;
  margin: 8px auto 8px 0;
  text-align: start;
`;

const BackBtn = styled.button`
  border: none;
  color: ${(props) => props.theme.colors.textSecondary};
  padding: 0;
  background-color: transparent;
  cursor: pointer;
`;

const Container = styled.div`
  padding: 54px 32px;
  max-width: 390px;
  width: 100%;
`;
const rotate = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const Spinner = styled.span`
  width: 48px;
  height: 48px;
  border: 5px solid ${(props) => props.theme.colors.textPrimary};
  border-bottom-color: ${(props) => props.theme.colors.cardDislikeIcon};
  border-radius: 50%;
  display: block;
  box-sizing: border-box;
  animation: ${rotate} 1s linear infinite;
  margin-top: 16px;
`;

const History = () => {
  const navigate = useNavigate();
  const { loadingSportLikes, sportLikes, sports }: any =
    useContext(SportContext);

  return (
    <Container>
      <BackBtn onClick={() => navigate(-1)}>
        <LeftArrowIcon />
      </BackBtn>
      <Title>History</Title>
      <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
      {loadingSportLikes ? (
        <Spinner />
      ) : (
        <SportLikes sportLikes={sportLikes} sports={sports} />
      )}
    </Container>
  );
};
export default History;
