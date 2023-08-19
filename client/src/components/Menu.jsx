import React from "react";
import styled from "styled-components";
import VideoTube from "../img/logo.png";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import HistoryIcon from "@mui/icons-material/History";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import ArticleIcon from "@mui/icons-material/Article";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import SettingsIcon from "@mui/icons-material/Settings";
import FlagIcon from "@mui/icons-material/Flag";
import HelpIcon from "@mui/icons-material/Help";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Container = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 100vh;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  position: sticky;
  top: 0;
`;
const Wrapper = styled.div`
  padding: 18px 26px;
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 25px;
  cursor: pointer;
`;
const Img = styled.img`
  height: 25px;
`;

const Items = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px;
  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;
const Login = styled.div``;
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
`;

export default function Menu({ darkMode, setdarkMode }) {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo>
            <Img src={VideoTube} />
            VideoTube
          </Logo>
        </Link>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Items>
            <HomeIcon />
            Home
          </Items>
        </Link>
        <Link to="/trends" style={{ textDecoration: "none", color: "inherit" }}>
          <Items>
            <ExploreIcon />
            Explore
          </Items>
        </Link>

        <Link
          to="/subscriptions"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Items>
            <SubscriptionsIcon />
            Subscriptions
          </Items>
        </Link>
        <Hr />
        <Items>
          <VideoLibraryIcon />
          Library
        </Items>
        <Items>
          <HistoryIcon />
          History
        </Items>
        <Hr />
        {!currentUser && (
          <>
            <Login>
              Sign in to like videos, comment, and subscribe.
              <Link to="/signin" style={{ textDecoration: "none" }}>
                <Button>
                  <AccountCircleIcon />
                  Sign In
                </Button>
              </Link>
            </Login>
            <Hr />
          </>
        )}
        <Title>Best Video from krishna</Title>
        <Items>
          <LibraryMusicIcon />
          Music
        </Items>
        <Items>
          <SportsBasketballIcon />
          Sports
        </Items>
        <Items>
          <SportsEsportsIcon />
          Gaming
        </Items>
        <Items>
          <MovieCreationIcon />
          Movies
        </Items>
        <Items>
          <ArticleIcon />
          News
        </Items>
        <Items>
          <LiveTvIcon />
          Live
        </Items>
        <Hr />
        <Items>
          <SettingsIcon />
          Settings
        </Items>
        <Items>
          <FlagIcon />
          Report
        </Items>
        <Items>
          <HelpIcon />
          Help
        </Items>
        <Items onClick={() => setdarkMode(!darkMode)}>
          <SettingsBrightnessIcon />
          {darkMode ? "Light" : "Dark"} Mode
        </Items>
      </Wrapper>
    </Container>
  );
}
