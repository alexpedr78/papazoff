// src/pages/Papazoff.js
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getPapazoffInfo, getArtistInfo } from "../sanity/queries";

const Container = styled.div`
  padding: 2rem 1rem;
  max-width: 1000px;
  margin: auto;
  color: #fff;
`;

const Title = styled.h1`
  text-align: center;
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 300;
  margin-bottom: 3rem;
  line-height: 2;
  background: linear-gradient(135deg, #ffffff 0%, #cccccc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Section = styled.section`
  margin-bottom: 3rem;
  padding: 2rem;
  background: #111;
  border-radius: 12px;
  border: 1px solid #222;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`;

const SectionTitle = styled.h2`
  font-size: 1.6rem;
  margin-bottom: 1.5rem;
  color: #fff;
  border-bottom: 2px solid #333;
  padding-bottom: 0.5rem;
`;

const Card = styled.div`
  background: #1a1a1a;
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  border: 1px solid #333;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.4);

  h3 {
    margin-bottom: 0.5rem;
  }

  p {
    color: #ccc;
    font-size: 0.9rem;
    margin: 0.25rem 0;
  }
`;

const Link = styled.a`
  display: inline-block;
  margin-top: 0.8rem;
  color: #87cefa;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #fff;
    text-decoration: underline;
  }
`;

const VideoWrapper = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

  iframe {
    position: absolute;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 8px;
  }
`;

export default function Papazoff() {
  const [data, setData] = useState(null);
  const [artist, setArtistInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getPapazoffInfo(), getArtistInfo()])
      .then(([papazoff, artisteInfo]) => {
        setData(papazoff);
        setArtistInfo(artisteInfo);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Container>
        <Title>Chargement…</Title>
      </Container>
    );
  }

  if (!data && !artist) {
    return (
      <Container>
        <Title>Pas de données.</Title>
      </Container>
    );
  }

  const conferences = data?.conferences ?? [];
  const dossierExpos = data?.dossierExpos ?? [];
  const pressBookFormats = data?.pressBookFormats ?? [];
  const films = data?.films ?? [];

  return (
    <Container>
      <Title>{artist?.name || "Papazoff"}</Title>

      {/* Intro artiste */}
      {artist && (
        <Section>
          {artist.photoUrl && (
            <img
              src={artist.photoUrl}
              alt={artist.name}
              style={{
                borderRadius: "50%",
                maxWidth: "200px",
                display: "block",
                margin: "0 auto 1.5rem",
              }}
            />
          )}
          <p style={{ textAlign: "center", color: "#ccc" }}>{artist.bio}</p>
        </Section>
      )}

      {/* Conférences */}
      <Section>
        <SectionTitle>Conférences</SectionTitle>
        {conferences.length > 0 ? (
          conferences.map((c, i) => (
            <Card key={i}>
              <h3>{c.title}</h3>
              <p>{c.date && new Date(c.date).toLocaleDateString("fr-FR")}</p>
              <p>{c.location}</p>
              <p>{c.description}</p>

              {c.documentUrl && (
                <Link href={c.documentUrl} target="_blank">
                  📄 {c.documentName || "Document"}
                </Link>
              )}

              {c.filmUrl && (
                <VideoWrapper>
                  <iframe
                    src={c.filmUrl}
                    title={`${c.title} film`}
                    allowFullScreen
                  />
                </VideoWrapper>
              )}
            </Card>
          ))
        ) : (
          <p>Aucune conférence disponible.</p>
        )}
      </Section>

      {/* Dossiers d’expositions */}
      <Section>
        <SectionTitle>Dossier d’expositions</SectionTitle>
        {dossierExpos.length > 0 ? (
          dossierExpos.map((d, i) => (
            <Link key={i} href={d.fileUrl} target="_blank">
              📄 {d.fileName || d.title}
            </Link>
          ))
        ) : (
          <p>Aucun dossier disponible.</p>
        )}
      </Section>

      {/* Press Book */}
      <Section>
        <SectionTitle>Press Book</SectionTitle>
        {pressBookFormats.length > 0 ? (
          pressBookFormats.map((pb, i) => (
            <Link key={i} href={pb.fileUrl} target="_blank">
              📄 {pb.fileName || pb.format}
            </Link>
          ))
        ) : (
          <p>Aucun press book disponible.</p>
        )}
      </Section>

      {/* Films */}
      <Section>
        <SectionTitle>Films</SectionTitle>
        {films.length > 0 ? (
          films.map((f, i) => (
            <Card key={i}>
              <h3>{f.title}</h3>
              {f.videoUrl && (
                <VideoWrapper>
                  <iframe src={f.videoUrl} title={f.title} allowFullScreen />
                </VideoWrapper>
              )}
              {f.fileUrl && (
                <Link href={f.fileUrl} target="_blank">
                  🎬 {f.fileName || "Télécharger"}
                </Link>
              )}
            </Card>
          ))
        ) : (
          <p>Aucun film disponible.</p>
        )}
      </Section>
    </Container>
  );
}
