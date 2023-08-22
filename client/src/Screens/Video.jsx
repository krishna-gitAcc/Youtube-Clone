import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ShareIcon from "@mui/icons-material/Share";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import Comments from "../components/Comments";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "../api/Axios/index";
import {
  dislikeVideo,
  likeVideo,
  videoFetchSuccess,
} from "../Redux/videoSlice";
import { format } from "timeago.js";
import { subscription } from "../Redux/userSlice";
import Recommendation from "../components/Recommendation";

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

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;

export default function Video() {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const videoId = useLocation().pathname.split("/")[2];
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoResponse = await axios.get(`/videos/find/${videoId}`);
        const channelResponse = await axios.get(
          `/users/find/${videoResponse.data.data.userId}`
        );
        dispatch(videoFetchSuccess(videoResponse.data.data));
        setChannel(channelResponse.data.data);
      } catch (error) {}
    };
    fetchData();
  }, [videoId, dispatch]);

  const handleLike = async () => {
    await axios.put(`/users/like/${currentVideo?._id}`);
    dispatch(likeVideo(currentUser?._id));
  };
  const handleDislike = async () => {
    await axios.put(`/users/dislike/${currentVideo?._id}`);
    dispatch(dislikeVideo(currentUser?._id));
  };

  const handleSubscription = async () => {
    if (currentUser?.subscribedUsers?.includes(channel?._id)) {
      await axios.put(`/users/sub/${channel._id}`);
    } else {
      await axios.put(`/users/unsub/${channel._id}`);
    }
    dispatch(subscription(channel._id));
  };

  return (
    <div>
      <Container>
        <Content>
          <VideoRapper>
            <VideoFrame src={currentVideo?.videoUrl} controls />
          </VideoRapper>
          <Title>{currentVideo?.title}</Title>
          <Details>
            <Info>
              {" "}
              {currentVideo?.videoView} views {format(currentVideo?.createdAt)}{" "}
            </Info>
            <Buttons>
              <Button onClick={handleLike}>
                {currentVideo?.videoLikes?.includes(currentUser?._id) ? (
                  <ThumbUpIcon />
                ) : (
                  <ThumbUpAltOutlinedIcon />
                )}
                {currentVideo?.videoLikes.length}
              </Button>
              <Button onClick={handleDislike}>
                {currentVideo?.videoDislikes?.includes(currentUser?._id) ? (
                  <ThumbDownIcon />
                ) : (
                  <ThumbDownOutlinedIcon />
                )}
                {currentVideo?.videoDislikes.length}
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
              <Img src={channel.Img} />
              <ChannelDetails>
                <ChannelName>{channel.name}</ChannelName>
                <ChannelCounter>
                  {channel.subscribers} subscribers
                </ChannelCounter>
                <Description>{currentVideo?.desc}</Description>
              </ChannelDetails>
            </ChannelInfo>
            <Subscribe onClick={handleSubscription}>
              {currentUser?.subscribedUsers?.includes(channel._id)
                ? "Subscribed"
                : "Subscribe"}
            </Subscribe>
          </Channel>
          <Hr />
          <Comments videoId={currentVideo?._id} />
        </Content>
        <Recommendation tags={currentVideo?.videoTag} />
      </Container>
    </div>
  );
}
