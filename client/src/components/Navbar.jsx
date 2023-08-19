import React, { useState } from "react";
import styled from "styled-components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { VideoCallOutlined } from "@mui/icons-material";
import { Popper, Paper } from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Grow from "@mui/material/Grow";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/userSlice";
import Upload from "./Upload";

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0px 20px;
  justify-content: flex-end;
`;
const Search = styled.div`
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* background-color: red; */
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: ${({ theme }) => theme.text};
`;
const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
`;
const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [uploadOpen, setUploadOpen] = useState(false);
  const anchorRef = React.useRef(null);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const handleLogout = (e) => {
    e.preventDefault();
    handleClose(e);
    dispatch(logout());
  };

  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input
              placeholder="search"
              onChange={(e) => setQuery(e.target.value)}
            ></Input>
            <SearchIcon
              onClick={() => {
                navigate(`/search?q=${query}`);
              }}
            />
          </Search>
          {currentUser ? (
            <>
              <div>
                <User>
                  <VideoCallOutlined onClick={() => setUploadOpen(true)} />
                  <Avatar
                    src={currentUser.img}
                    ref={anchorRef}
                    onClick={handleToggle}
                  />
                  <div ref={anchorRef} onClick={handleToggle}>
                    {currentUser.name}
                  </div>
                </User>

                <Popper
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  placement="bottom-start"
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === "bottom-start"
                            ? "left top"
                            : "left bottom",
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList
                            autoFocusItem={open}
                            id="composition-menu"
                            aria-labelledby="composition-button"
                            onKeyDown={handleListKeyDown}
                          >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>
                              My account
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </div>
            </>
          ) : (
            <Link to="/signin" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleIcon />
                Sign In
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
      {uploadOpen && <Upload setUploadOpen={setUploadOpen} />}
    </>
  );
}
