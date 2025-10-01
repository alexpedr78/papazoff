// src/pages/PapazoffManifeste.js
import React, { useEffect, useState } from "react";
import { getPapazoffInfo } from "../sanity/queries";
import styled from "styled-components";

const Container = styled.div`
  max-width: 1000px;
  margin: auto;
  padding: 2rem;
  color: #fff;
`;

const Item = styled.div`
  background: #1a1a1a;
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  border: 1px solid #333;
`;

export default function PapazoffManifeste() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getPapazoffInfo().then(setData);
  }, []);

  if (!data) return <Container>Chargement…</Container>;

  return (
    <Container>
      <h1>Manifeste</h1>
      {data.manifeste?.length > 0 ? (
        data.manifeste.map((m, i) => (
          <Item key={i}>
            <h3>{m.title}</h3>
            <p>{m.description}</p>
            {m.fileUrl && (
              <a href={m.fileUrl} target="_blank" rel="noopener noreferrer">
                📄 {m.fileName}
              </a>
            )}
            {m.videoUrl && (
              <iframe
                src={m.videoUrl}
                title={`manifeste-video-${i}`}
                width="100%"
                height="400"
                allowFullScreen
                style={{
                  border: "none",
                  borderRadius: "8px",
                  marginTop: "1rem",
                }}
              />
            )}
            {m.videoFileUrl && (
              <a
                href={m.videoFileUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                🎬 Télécharger la vidéo ({m.videoFileName})
              </a>
            )}
          </Item>
        ))
      ) : (
        <p>Aucun manifeste disponible.</p>
      )}
    </Container>
  );
}
