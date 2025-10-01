// src/pages/PapazoffPoesie.js
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

export default function PapazoffPoesie() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getPapazoffInfo().then(setData);
  }, []);

  if (!data) return <Container>Chargement…</Container>;

  return (
    <Container>
      <h1>Poésie</h1>
      {data.poesie?.length > 0 ? (
        data.poesie.map((p, i) => (
          <Item key={i}>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            {p.fileUrl && (
              <a href={p.fileUrl} target="_blank" rel="noopener noreferrer">
                📄 {p.fileName}
              </a>
            )}
            {p.videoUrl && (
              <iframe
                src={p.videoUrl}
                title={`poesie-video-${i}`}
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
            {p.videoFileUrl && (
              <a
                href={p.videoFileUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                🎬 Télécharger la vidéo ({p.videoFileName})
              </a>
            )}
          </Item>
        ))
      ) : (
        <p>Aucune poésie disponible.</p>
      )}
    </Container>
  );
}
