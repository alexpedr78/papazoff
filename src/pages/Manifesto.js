import React from 'react';
import styled from 'styled-components';
// import VideoPlayer from '../components/VideoPlayer'; // Placeholder for video player component

const ManifestoContainer = styled.div`
  min-height: calc(100vh - 80px);
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const ManifestoHeader = styled.h2`
  text-align: center;
  margin-bottom: 3rem;
`;

const VideoSection = styled.div`
  width: 100%;
  max-width: 800px;
  background-color: #0a0a0a;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #333;

  // Placeholder video styling
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1rem;
`;

const TextSection = styled.div`
  max-width: 800px;
  padding: 1rem;
  background: #1a1a1a;
  border-radius: 8px;
  border: 1px solid #333;

  h3 {
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1rem;
    line-height: 1.6;
    color: #ccc;
  }
`;

const Manifesto = () => {
  return (
    <ManifestoContainer className="fade-in">
      <ManifestoHeader>Artist Manifesto</ManifestoHeader>
      <VideoSection>
        {/* Placeholder for video player */}
        {/* <VideoPlayer src={videoUrl} /> */}
        Video Placeholder
      </VideoSection>
      <TextSection>
        <h3>The Language of Paint</h3>
        <p>
          Art is not merely decoration—it is a language that speaks to the soul, a bridge between the visible and invisible worlds. In every brushstroke, I seek to capture not just what the eye sees, but what the heart feels.
        </p>
      </TextSection>
    </ManifestoContainer>
  );
};

export default Manifesto;

