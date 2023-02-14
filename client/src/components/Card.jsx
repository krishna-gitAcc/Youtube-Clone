import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 360px;
  margin-bottom: 45px;
  cursor: pointer;
`;
const Img = styled.img`
  width: 100%;
  height: 202px;
  cursor: pointer;
  background-color: #999;
`;
const Details = styled.div`
  display: flex;
  margin-top: 16px;
  gap: 12px;
`;

const ChannelImg = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
`;

const Text = styled.div`
  /* background-color: red; */
`;
const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  margin-top: 0px;
`;
const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;
const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

export default function Card() {
  return (
    <Link to="/video/test" style={{ textDecoration: "none" }}>
      <Container>
        <Img src="https://www.fotor.com/blog/wp-content/uploads/2019/10/Untitled-design-18.jpg" />
        <Details>
          <ChannelImg src="https://yt3.googleusercontent.com/ytc/AL5GRJUOhe9c1D67-yLQEkT2EqyRclI5V3EOTANZQXmt=s88-c-k-c0x00ffffff-no-rj" />
          <Text>
            <Title>Test Video</Title>
            <ChannelName>My Channel</ChannelName>
            <Info>This is information regarding the video.</Info>
          </Text>
        </Details>
      </Container>
    </Link>
  );
}
