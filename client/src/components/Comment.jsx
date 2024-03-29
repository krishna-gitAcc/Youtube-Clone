import axios from "../api/Axios/index";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { format } from "timeago.js";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0;
`;
const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;
const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;
const Text = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.text};
`;

export default function Comment({ comment }) {
  const [channel, setChannel] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const channelResponse = await axios.get(
          `/users/find/${comment.userId}`
        );
        setChannel(channelResponse.data.data);
      } catch (error) {}
    };
    fetchData();
  }, [comment]);
  return (
    <div>
      <Container>
        <Avatar src={channel.img} />
        <Details>
          <Name>
            {channel.name}
            <Date>{format(comment.createdAt)}</Date>
          </Name>
          <Text>{comment.desc}</Text>
        </Details>
      </Container>
    </div>
  );
}
