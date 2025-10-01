// src/pages/PapazoffConferences.js
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

export default function PapazoffConferences() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getPapazoffInfo().then(setData);
  }, []);

  if (!data) return <Container>Chargement…</Container>;

  return (
    <Container>
      <h1>Conférences</h1>
      {data.conferences?.length > 0 ? (
        data.conferences.map((c, i) => (
          <Item key={i}>
            <h3>{c.title}</h3>
            <p>{c.description}</p>
            <p>
              {c.date && new Date(c.date).toLocaleDateString("fr-FR")} –{" "}
              {c.location}
            </p>
            {c.docUrl && (
              <a href={c.docUrl} target="_blank" rel="noopener noreferrer">
                📄 {c.docName}
              </a>
            )}
            {c.videoUrl && (
              <iframe
                src={c.videoUrl}
                title={`conference-video-${i}`}
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
            {c.videoFileUrl && (
              <a
                href={c.videoFileUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                🎬 Télécharger la vidéo ({c.videoFileName})
              </a>
            )}
          </Item>
        ))
      ) : (
        <p>Aucune conférence disponible.</p>
      )}
    </Container>
  );
}
