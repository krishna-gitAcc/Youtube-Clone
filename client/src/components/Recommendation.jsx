import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import RecommendationCard from "./RecommendationCard";

const Container = styled.div`
  flex: 2;
`;

export default function Recommendation({ tags }) {
  const [videos, setVideo] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await axios.get(`/videos/tags?tags=${tags}`);
      setVideo(response.data.data);
      console.log(response.data.data);
    };
    fetchVideos();
  }, [tags]);
  return (
    <Container>
      {videos?.map((video) => (
        <RecommendationCard key={video._id} video={video} />
      ))}
    </Container>
  );
}
