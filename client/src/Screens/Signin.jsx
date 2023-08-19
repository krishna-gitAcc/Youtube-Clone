import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../Redux/userSlice";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [loginPayload, setLoginPayload] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  });
  const onChange = (e) => {
    setLoginPayload({
      ...loginPayload,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const response = await axios.post("/auth/signin", loginPayload);
      dispatch(loginSuccess(response.data.data));
    } catch (error) {
      dispatch(loginFailure());
    }
  };

  const signInWithGoogle = () => {
    dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then(async (result) => {
        await axios
          .post("/auth/google", {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          })
          .then((response) => {
            dispatch(loginSuccess(response.data.data));
          });
      })
      .catch((error) => {
        dispatch(loginFailure());
      });
  };

  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to LamaTube</SubTitle>
        <Input
          placeholder="email"
          name="email"
          value={loginPayload.value}
          onChange={onChange}
        />
        <Input
          type="password"
          name="password"
          value={loginPayload.password}
          placeholder="password"
          onChange={onChange}
        />
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
          <Button onClick={handleSignIn}>Sign in</Button>
        </div>
        <Button onClick={signInWithGoogle}>Signin With Google</Button>
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
