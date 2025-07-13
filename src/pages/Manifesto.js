import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getManifesto } from "../sanity/queries";
import { urlFor } from "../sanity/client";

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

  iframe {
    width: 100%;
    height: 450px;
    border: none;
  }
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
  const [manifesto, setManifesto] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await getManifesto();
      setManifesto(data);
    })();
  }, []);

  if (!manifesto) {
    return (
      <ManifestoContainer className="fade-in">
        <ManifestoHeader>Artist Manifesto</ManifestoHeader>
        <p>Loading...</p>
      </ManifestoContainer>
    );
  }

  return (
    <ManifestoContainer className="fade-in">
      <ManifestoHeader>{manifesto.title}</ManifestoHeader>
      {manifesto.videoUrl && (
        <VideoSection>
          <iframe
            src={manifesto.videoUrl}
            title="Manifesto Video"
            allowFullScreen
          />
        </VideoSection>
      )}
      <TextSection>
        <h3>{manifesto.excerpt}</h3>
        <p>{manifesto.fullText}</p>
      </TextSection>
    </ManifestoContainer>
  );
};

export default Manifesto;
