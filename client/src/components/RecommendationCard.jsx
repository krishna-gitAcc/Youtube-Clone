import React from "react";
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
  width: 100%;
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

export default function RecommendationCard() {
  return (
    <Link to="/video/test" style={{ textDecoration: "none" }}>
      <Container>
        <Img src="https://www.fotor.com/blog/wp-content/uploads/2019/10/Untitled-design-18.jpg" />
        <Details>
          <Title>Test Video</Title>
          <ChannelName>My Channel</ChannelName>
          <Info>This is information regarding the video.</Info>
        </Details>
      </Container>
    </Link>
  );
}
