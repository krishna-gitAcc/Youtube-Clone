import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #000000b4;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;
const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  position: relative;
`;
const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
const Title = styled.div`
  text-align: center;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;
const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
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

const Label = styled.label`
  font-size: 14px;
`;

export default function Upload({ setUploadOpen }) {
  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [fileInput, setFileInput] = useState({});
  const [videoTag, setVideoTag] = useState([]);
  const navigate = useNavigate();

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl" ? setImgPerc(progress) : setVideoPerc(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFileInput({ ...fileInput, [urlType]: downloadURL });
        });
      }
    );
  };

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);
  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);

  const handleTags = (e) => {
    setVideoTag(e.target.value.split(","));
  };

  const handleChange = (e) => {
    setFileInput({ ...fileInput, [e.target.name]: e.target.value });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const response = await axios.post("/videos", { ...fileInput, videoTag });
    setUploadOpen(false);
    response.status === 200 && navigate(`/video/${response.data.data._id}`);
  };

  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setUploadOpen(false)}>X</Close>
        <Title>Upload a new Video</Title>
        <Label>Video:</Label>
        {videoPerc > 0 ? (
          "Uploading: " + Math.round(videoPerc) + "%..."
        ) : (
          <Input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        )}
        <Input
          type="text"
          placeholder="Title"
          name="title"
          onChange={handleChange}
        />
        <Desc
          placeholder="Description"
          name="desc"
          rows={8}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Separate tags with commas"
          onChange={handleTags}
        />
        <Label>Image:</Label>
        {imgPerc > 0 ? (
          "Uploading: " + imgPerc
        ) : (
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImg(e.target.files[0]);
            }}
          />
        )}
        <Button onClick={handleUpload}>Upload </Button>
      </Wrapper>
    </Container>
  );
}
