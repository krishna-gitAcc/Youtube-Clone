import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const LinkItem = styled(Link)`
  margin-left: 30px;
  text-decoration: "none";
`;

export default function Signin() {
  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to LamaTube</SubTitle>
        <Input placeholder="username" />
        <Input type="password" placeholder="password" />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "110%",
            marginTop: "50px",
          }}
        >
          <Link
            to="/signup"
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            Create account
          </Link>
          <Button>Sign in</Button>
        </div>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <LinkItem>Help</LinkItem>
          <LinkItem>Privacy</LinkItem>
          <LinkItem>Terms</LinkItem>
        </Links>
      </More>
    </Container>
  );
}
