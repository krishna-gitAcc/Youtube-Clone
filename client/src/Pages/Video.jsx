import React from "react";
import styled from "styled-components";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ShareIcon from "@mui/icons-material/Share";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import Comments from "../components/Comments";
import Comment from "../components/Comment";
import RecommendationCard from "../components/RecommendationCard";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;
const Content = styled.div`
  flex: 5;
`;

const VideoRapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;
const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetails = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
  margin: 0;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const Recommendation = styled.div`
  flex: 2;
`;
export default function Video() {
  return (
    <div>
      <Container>
        <Content>
          <VideoRapper>
            <iframe
              width="100%"
              height="720"
              src="https://www.youtube.com/embed/yIaXoop8gl4"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </VideoRapper>
          <Title>Test Video</Title>
          <Details>
            <Info> 62,733 views 30 Jun 2022 React.js Real-World Projects </Info>
            <Buttons>
              <Button>
                <ThumbUpIcon />
                123
              </Button>
              <Button>
                <ThumbDownIcon />
                dislike
              </Button>
              <Button>
                <ShareIcon />
                Share
              </Button>
              <Button>
                <LibraryAddIcon />
                Save
              </Button>
            </Buttons>
          </Details>
          <Hr />
          <Channel>
            <ChannelInfo>
              <Img src="https://yt3.googleusercontent.com/ytc/AL5GRJUOhe9c1D67-yLQEkT2EqyRclI5V3EOTANZQXmt=s88-c-k-c0x00ffffff-no-rj" />
              <ChannelDetails>
                <ChannelName>Lama Dev</ChannelName>
                <ChannelCounter>200k subscribers</ChannelCounter>
                <Description>
                  orem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam
                </Description>
              </ChannelDetails>
            </ChannelInfo>
            <Subscribe>Subscribe</Subscribe>
          </Channel>
          <Hr />
          <Comments />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
        </Content>
        <Recommendation>
          <RecommendationCard />
          <RecommendationCard />
          <RecommendationCard />
          <RecommendationCard />
          <RecommendationCard />
          <RecommendationCard />
          <RecommendationCard />
          <RecommendationCard />
          <RecommendationCard />
          <RecommendationCard />
          <RecommendationCard />
          <RecommendationCard />
          <RecommendationCard />
          <RecommendationCard />
          <RecommendationCard />
          <RecommendationCard />
        </Recommendation>
      </Container>
    </div>
  );
}
