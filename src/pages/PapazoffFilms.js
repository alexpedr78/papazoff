// src/pages/PapazoffFilms.js
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

export default function PapazoffFilms() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getPapazoffInfo().then(setData);
  }, []);

  if (!data) return <Container>Chargement…</Container>;

  return (
    <Container>
      <h1>Films</h1>
      {data.films?.length > 0 ? (
        data.films.map((f, i) => (
          <Item key={i}>
            <h3>{f.title}</h3>
            <p>{f.description}</p>
            {f.videoUrl && (
              <iframe
                src={f.videoUrl}
                title={`film-video-${i}`}
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
            {f.fileUrl && (
              <a href={f.fileUrl} target="_blank" rel="noopener noreferrer">
                🎬 Télécharger la vidéo ({f.fileName})
              </a>
            )}
          </Item>
        ))
      ) : (
        <p>Aucun film disponible.</p>
      )}
    </Container>
  );
}
