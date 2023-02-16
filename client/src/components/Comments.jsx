import React from "react";
import styled from "styled-components";

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

export default function Comments() {
  return (
    <div>
      <Container>
        <NewComment>
          <Avatar src="https://yt3.googleusercontent.com/ytc/AL5GRJUOhe9c1D67-yLQEkT2EqyRclI5V3EOTANZQXmt=s88-c-k-c0x00ffffff-no-rj" />
          <Input placeholder="Add a comment." />
        </NewComment>
      </Container>
    </div>
  );
}
