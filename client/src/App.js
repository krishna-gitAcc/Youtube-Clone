import "./App.css";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu.jsx";
import Navbar from "./components/Navbar";
import Home from "./Screens/Home";
import Video from "./Screens/Video";
import { darkTheme, lightTheme } from "./utils/Thems";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./Screens/Signin";
import SignUp from "./Screens/SignUp";
import Search from "./Screens/Search";
import axios from "axios";

const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`
  padding: 22px 96px;
`;

function App() {
  const [darkMode, setdarkMode] = useState(true);
  // const [first, setfirst] = useState(second)
  axios.defaults.baseURL =
    "https://youtube-clone-backend-re0a.onrender.com/api/";

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Menu darkMode={darkMode} setdarkMode={setdarkMode} />
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random" />} />
                  <Route path="trends" element={<Home type="trend" />} />
                  <Route path="search" element={<Search />} />
                  <Route path="subscriptions" element={<Home type="sub" />} />
                  <Route path="signin" element={<Signin />} />
                  <Route path="signup" element={<SignUp />} />
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
