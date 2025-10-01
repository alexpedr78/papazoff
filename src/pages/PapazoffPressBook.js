import React, { useEffect, useState } from "react";
import { getPapazoffInfo } from "../sanity/queries";
import styled from "styled-components";

const Container = styled.div`
  max-width: 1000px;
  margin: auto;
  padding: 2rem;
  color: #fff;
`;

export default function PapazoffPressBook() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getPapazoffInfo().then(setData);
  }, []);

  if (!data) return <Container>Chargement…</Container>;

  return (
    <Container>
      <h1>Press Book</h1>
      {data.pressBook?.map((pb, i) => (
        <div key={i} style={{ marginBottom: "1.5rem" }}>
          <h3>{pb.title}</h3>
          <p>{pb.description}</p>
          {pb.fileUrl && (
            <a href={pb.fileUrl} target="_blank" rel="noopener noreferrer">
              📄 {pb.fileName}
            </a>
          )}
          {pb.videoUrl && (
            <iframe
              src={pb.videoUrl}
              title={`pressbook-video-${i}`}
              width="100%"
              height="400"
              allowFullScreen
            />
          )}
          {pb.videoFileUrl && (
            <a href={pb.videoFileUrl} target="_blank" rel="noopener noreferrer">
              🎬 Télécharger la vidéo ({pb.videoFileName})
            </a>
          )}
        </div>
      ))}
    </Container>
  );
}
