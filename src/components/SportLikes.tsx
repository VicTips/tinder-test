import styled from "styled-components";
import { parseFirebaseTimestamp } from "../utils/parseFirebaseTimestamp";
import HeartIcon from "./icons/HeartIcon";
import CloseIcon from "./icons/CloseIcon";

const SportLikesContainer = styled.ul`
  width: 100%;
  margin: 0 auto;
  padding: 0 0 125px;
  display: flex;
  flex-direction: column;
  list-style: none;
  gap: 16px;
`;

const SportLikeDate = styled.h2`
  opacity: 0.8;
  font-family: "Epilogue", sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 20.72px;
  color: ${(props) => props.theme.colors.textPrimary};
  margin: 0 0 14px;
`;

const SportLikeCards = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 0;
`;

const SportLikeCard = styled.li`
  list-style: none;
  width: 100%;
  height: 77px;
  border-radius: 12px;
  background-color: ${(props) => props.theme.colors.bgLikeCard};
  display: flex;
  position: relative;
`;

const SportLikeCardImg = styled.img`
  height: 100%;
  width: 80%;
  object-fit: cover;
  border-radius: 12px;
  filter: brightness(0.51);
`;

const SportLikeCardName = styled.span`
  position: absolute;
  margin: auto 0 auto 15px;
  top: 0;
  bottom: 0;
  height: fit-content;
  color: #fefefe;
  font-size: 24px;
  font-weight: 700;
  line-height: 29.29px;
  letter-spacing: -0.045rem;
`;

const SportLikeCardReaction = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  min-width: 68px;
`;

const SportLikeCardReactionLikeIcon = styled.div`
  width: 23.82px;
  color: ${(props) => props.theme.colors.cardLikeIcon};
  display: flex;
  align-items: center;
`;

const SportLikeCardReactionDislikeIcon = styled.div`
  width: 19.43px;
  color: ${(props) => props.theme.colors.cardDislikeIcon};
  display: flex;
  align-items: center;
`;

const SportLikes = ({ sportLikes, sports }: any) => {
  const groupedLikesByDate = sportLikes.length
    ? Object.groupBy(sportLikes, ({ createdAt }: any) =>
        parseFirebaseTimestamp(createdAt)
      )
    : null;

  if (groupedLikesByDate) {
    return (
      <SportLikesContainer>
        {Object.keys(groupedLikesByDate).map((date, index) => {
          return (
            <li key={index}>
              <SportLikeDate>{date}</SportLikeDate>
              <SportLikeCards>
                {groupedLikesByDate[date].map((sportLike) => {
                  const index = sports
                    .map((sport: any) => sport.idSport)
                    .indexOf(sportLike.sportId);
                  return (
                    <SportLikeCard key={sportLike.sportId}>
                      <SportLikeCardImg
                        src={sports[index].strSportThumb}
                        alt={sports[index].strSport}
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null;
                          currentTarget.src =
                            "../../../src/assets/img/sports-image.jpeg";
                        }}
                      />
                      <SportLikeCardName>
                        {sports[index].strSport}
                      </SportLikeCardName>
                      <SportLikeCardReaction>
                        {sportLike.like ? (
                          <SportLikeCardReactionLikeIcon>
                            <HeartIcon />
                          </SportLikeCardReactionLikeIcon>
                        ) : (
                          <SportLikeCardReactionDislikeIcon>
                            <CloseIcon />
                          </SportLikeCardReactionDislikeIcon>
                        )}
                      </SportLikeCardReaction>
                    </SportLikeCard>
                  );
                })}
              </SportLikeCards>
            </li>
          );
        })}
      </SportLikesContainer>
    );
  } else {
    return <p>Empty</p>;
  }
};

export default SportLikes;
