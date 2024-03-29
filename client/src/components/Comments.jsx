import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import axios from "../api/Axios/index";
import { useSelector } from "react-redux";

const Container = styled.div``;
const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

export default function Comments({ videoId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/comments/${videoId}`);
        setComments(response.data.data);
      } catch (error) {}
    };
    fetchComments();
  }, [videoId]);

  return (
    <div>
      <Container>
        <NewComment>
          <Avatar src={currentUser?.img} />
          <Input placeholder="Add a comment." />
        </NewComment>
        {comments?.map((comment) => (
          <Comment comment={comment} key={comment._id} />
        ))}
      </Container>
    </div>
  );
}
