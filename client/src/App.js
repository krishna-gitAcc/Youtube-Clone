import "./App.css";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu.jsx";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Video from "./Pages/Video";
import { darkTheme, lightTheme } from "./utils/Thems";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignpostOutlined } from "@mui/icons-material";
import Signin from "./Pages/Signin";

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
                  <Route index element={<Home />} />
                  <Route path="signin" element = {<Signin/>}/>
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
