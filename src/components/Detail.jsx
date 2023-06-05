import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaPlay, FaUsers } from "react-icons/fa";
import { BsPlusCircle } from "react-icons/bs";
import db from "../firebase";
import { useParams } from "react-router-dom";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

const style = { backgroundColor: "rgba(0, 0, 0, 0.5)", borderRadius: "50%" };

const Detail = () => {
  const [detailData, setDetailData] = useState({});

  const { movieId } = useParams();

  useEffect(() => {
    const fetchDetails = async () => {
      const detailsCollectionRef = doc(db, "movies", movieId);
      const docSnap = await getDoc(detailsCollectionRef);

      if (docSnap.exists()) {
        setDetailData(docSnap.data());
      } else {
        console.log("No Document Found!");
      }
    };
    fetchDetails();
  }, [movieId]);

  return (
    <Container>
      <Background>
        <img
          src={detailData.backgroundImg}
          alt={detailData.title}
        />
      </Background>
      <ImgTitle>
        <img
          src={detailData.titleImg}
          alt={detailData.title}
        />
      </ImgTitle>
      <ContentMeta>
        <Controls>
          <Player>
            <FaPlay size={20} />
            <span>Play</span>
          </Player>
          <Trailer>
            <FaPlay size={20} />
            <span>Trailer</span>
          </Trailer>
          <AddList>
            <BsPlusCircle
              size={54}
              style={style}
            />
          </AddList>
          <GroupWatch>
            <FaUsers size={28} />
          </GroupWatch>
        </Controls>
        <SubTitle>{detailData.subTitle}</SubTitle>
        <Description>{detailData.description}</Description>
      </ContentMeta>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
`;

const Background = styled.div`
  left: 0px;
  opacity: 0.8;
  position: fixed;
  right: 0px;
  top: 0px;
  z-index: -1;

  img {
    width: 100vw;
    height: 100vh;

    @media (max-width: 768px) {
      width: initial;
    }
  }
`;

const ImgTitle = styled.div`
  display: flex;
  align-items: flex-end;
  -webkit-box-pack: start;
  justify-content: flex-start;
  margin: 0px auto;
  height: 30vw;
  min-height: 170px;
  padding-bottom: 24px;
  width: 100%;

  img {
    max-width: 600px;
    min-width: 200px;
    width: 35vw;
  }
`;

const ContentMeta = styled.div`
  max-width: 874px;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  margin: 24px 0px;
  min-height: 56px;
`;

const Player = styled.button`
  font-size: 15px;
  margin: 0px 22px 0px 0px;
  padding: 0px 24px;
  height: 56px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 1.8px;
  text-align: center;
  text-transform: uppercase;
  background: rgb(248, 249, 249);
  border: none;
  color: rgb(0, 0, 0);
  transition: transform 0.3s ease-in-out;

  span {
    margin-left: 5px;
    font-size: 20px;
  }

  &:hover {
    background: rgb(220, 220, 220);
    transform: scale(1.03);
  }

  @media (max-width: 768px) {
    height: 45px;
    padding: 0px 12px;
    font-size: 12px;
    margin: 0px 10px 0px 0px;

    FaPlay {
      width: 25px;
    }
  }
`;

const Trailer = styled.button`
  font-size: 15px;
  margin: 0px 22px 0px 0px;
  padding: 0px 24px;
  height: 56px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 1.8px;
  text-align: center;
  text-transform: uppercase;
  background: rgb(0, 0, 0, 0.3);
  border: 1px solid rgb(249, 249, 249);
  color: rgb(249, 249, 249);
  transition: transform 0.3s ease-in-out;

  span {
    margin-left: 5px;
    font-size: 20px;
  }

  &:hover {
    transform: scale(1.03);
  }

  @media (max-width: 768px) {
    height: 45px;
    padding: 0px 12px;
    font-size: 12px;
    margin: 0px 10px 0px 0px;

    FaPlay {
      width: 25px;
    }
`;

const AddList = styled.div`
cursor: pointer;
transition: transform 0.3s ease-in-out;

    &:hover {
        transform: scale(1.03);
    }
  }
`;

const GroupWatch = styled.div`
  margin-left: 20px;
  background-color: rgb(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 50%;
  border: 3.5px solid rgb(249, 449, 249);
  height: 54px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.03);
  }
`;

const SubTitle = styled.div`
  color: rgb(249, 249, 249);
  font-size: 15px;
  min-height: 20px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Description = styled.div`
  font-size: 20px;
  padding-top: 10px;
  color: rgb(249, 249, 249);
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export default Detail;
