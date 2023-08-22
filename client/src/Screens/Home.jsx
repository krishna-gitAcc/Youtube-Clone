import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "../api/Axios/index";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export default function Home({ type }) {
  const [videos, setVideo] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await axios.get(`/videos/${type}`);
      setVideo(response.data.data);
    };
    fetchVideos();
  }, [type]);

  return (
    <Container>
      {videos?.map((video) => {
        return <Card key={video._id} video={video} />;
      })}
    </Container>
  );
}
