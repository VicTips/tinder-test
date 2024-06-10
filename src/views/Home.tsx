import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import styled from "styled-components";
import { SportContext } from "../context/SportsContextProvider";
import HeartIcon from "../components/icons/HeartIcon";
import CloseIcon from "../components/icons/CloseIcon";
import { UserContext } from "../context/AuthContext";

const ToggleBtn = styled.button`
  cursor: pointer;
  font-size: 26px;
  line-height: 38.49px;
  background-color: ${(props) => props.theme.colors.togglebtn};
  border: none;
  width: 62px;
  height: 63px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 18px;
  position: absolute;
  left: 21px;
  top: 22px;
`;

const SportImg = styled.img`
  width: 100%;
  height: 100%;
  border: 1px solid ${(props) => props.theme.colors.bgDark};
  object-fit: cover;
  border-radius: 32px;
`;

const ImgContainer = styled.div`
  border-radius: 32px;
  position: relative;
  width: 100%;
  max-width: 390px;
  aspect-ratio: 65/94;
  overflow: hidden;
`;

const TitleContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100px;
  padding: 26px 21px;
  background: linear-gradient(180deg, transparent, #000000 58.85%, black);
`;

const SportTitle = styled.span`
  font-weight: 700;
  font-size: 34px;
  line-height: 41.49px;
  color: #fefefe;
`;

const LikeBtn = styled.button`
  width: 81px;
  height: 81px;
  border: none;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: white;
  background: linear-gradient(125.02deg, #236bfe -17.11%, #063ba8 98.58%);
  box-shadow: 0px 10px 25px 0px #236bfe33;
  &:hover {
    filter: brightness(1.05);
  }
`;

const DislikeBtn = styled.button`
  width: 51px;
  height: 51px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
  border-radius: 100%;
  background-color: ${(props) => props.theme.colors.togglebtn};
  color: ${(props) => props.theme.colors.dislikeIcon};
  box-shadow: 0px 10px 25px 0px #00000014;
  &:hover {
    filter: brightness(1.05);
  }
`;

const BtnsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 22px;
  padding-top: 47px;
`;

const Home = () => {
  const { user }: any = useContext(UserContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { sports, index, addSportLike } = useContext(SportContext);
  return (
    <>
      <ImgContainer>
        <ToggleBtn onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "🌤️"}
        </ToggleBtn>
        <SportImg
          src={sports[index].strSportThumb}
          alt={sports[index].strSport}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = "../../../src/assets/img/sports-image.jpeg";
          }}
        />
        <TitleContainer>
          <SportTitle>{sports[index].strSport}</SportTitle>
        </TitleContainer>
      </ImgContainer>
      <BtnsContainer>
        <DislikeBtn onClick={() => addSportLike(user.uid, false)}>
          <CloseIcon />
        </DislikeBtn>
        <LikeBtn onClick={() => addSportLike(user.uid, true)}>
          <HeartIcon />
        </LikeBtn>
      </BtnsContainer>
    </>
  );
};
export default Home;
