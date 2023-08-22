import axios from "../api/Axios/index";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  margin-bottom: 20px;
  cursor: pointer;
  /* background-color: red; */
  gap: 12px;
`;
const Img = styled.img`
  background-color: #999;
  border-radius: 3px;
  cursor: pointer;
  flex: 1;
  height: 120px;
  width: 120px;
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  margin: 0px;
`;
const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 0px 0px;
`;
const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

export default function RecommendationCard({ video }) {
  const [channel, setChannel] = useState({});
  useEffect(() => {
    const fetchVideos = async () => {
      const response = await axios.get(`/users/find/${video.userId}`);
      setChannel(response.data.data);
    };
    fetchVideos();
  }, [video.userId]);
  return (
    <Link to="/video/test" style={{ textDecoration: "none" }}>
      <Container>
        <Img src={video.imgUrl} />
        <Details>
          <Title>{video.title}</Title>
          <ChannelName>{channel.name}</ChannelName>
          <Info>{video.desc}</Info>
        </Details>
      </Container>
    </Link>
  );
}
