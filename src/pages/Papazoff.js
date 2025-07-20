// src/pages/Papazoff.js
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getPapazoffInfo, getArtistInfo } from "../sanity/queries";

const Container = styled.div`
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: auto;
  color: #fff;
`;
const Section = styled.section`
  margin-bottom: 4rem;
`;
const Title = styled.h2`
  text-align: center;
  font-size: 2rem;
  border-bottom: 2px solid #555;
  padding-bottom: 0.5rem;
  margin-bottom: 2rem;
  color: #fff;
`;
const Card = styled.div`
  background: #1a1a1a;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  border: 1px solid #333;
`;
const Link = styled.a`
  display: block;
  margin: 0.5rem 0;
  color: #87cefa;
  text-decoration: none;
`;
const VideoWrapper = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  iframe {
    position: absolute;
    width: 100%;
    height: 100%;
  }
`;

export default function Papazoff() {
  const [data, setData] = useState(null);
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getPapazoffInfo(), getArtistInfo()])
      .then(([pap, art]) => {
        setData(pap);
        setArtist(art);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <Container>
        <Title>Chargement…</Title>
      </Container>
    );
  if (!data && !artist)
    return (
      <Container>
        <Title>Pas de données.</Title>
      </Container>
    );

  // <-- Garde d’accès et valeurs par défaut
  const conferences = data?.conferences ?? [];
  const dossierExpos = data?.dossierExpos ?? [];
  const pressBookFormats = data?.pressBookFormats ?? [];
  const films = data?.films ?? [];
  return (
    <Container>
      {/* Intro */}
      {artist && (
        <Section id="intro">
          <Title>{artist.name}</Title>
          {artist.photoUrl && (
            <img
              src={artist.photoUrl}
              alt={artist.name}
              style={{
                borderRadius: "50%",
                maxWidth: "200px",
                display: "block",
                margin: "1rem auto",
              }}
            />
          )}
          <p style={{ textAlign: "center", color: "#ccc" }}>{artist.bio}</p>
        </Section>
      )}

      {/* Conférences */}
      <Section id="conferences">
        <Title>Conférences</Title>
        {conferences.length > 0 ? (
          conferences.map((c, i) => (
            <Card key={i}>
              <h3>{c.title}</h3>
              <p>{c.date && new Date(c.date).toLocaleDateString("fr-FR")}</p>
              <p>{c.location}</p>
              <p>{c.description}</p>
              {c.document?.asset?.url && (
                <Link href={c.document.asset.url} target="_blank">
                  📄 Document
                </Link>
              )}
              {c.film?.asset?.url && (
                <VideoWrapper>
                  <iframe
                    src={c.film.asset.url}
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

      {/* Dossier d’expositions */}
      <Section id="dossier-expos">
        <Title>Dossier d’expositions</Title>
        {dossierExpos.length > 0 ? (
          dossierExpos.map((d, i) => (
            <Link key={i} href={d.file.asset.url} target="_blank">
              📄 {d.title}
            </Link>
          ))
        ) : (
          <p>Aucun dossier disponible.</p>
        )}
      </Section>

      {/* Press Book */}
      <Section id="press-book">
        <Title>Press Book</Title>
        {pressBookFormats.length > 0 ? (
          pressBookFormats.map((pb, i) => (
            <Link key={i} href={pb.file.asset.url} target="_blank">
              📄 {pb.format}
            </Link>
          ))
        ) : (
          <p>Aucun press book disponible.</p>
        )}
      </Section>

      {/* Films */}
      <Section id="films">
        <Title>Films</Title>
        {films.length > 0 ? (
          films.map((f, i) => (
            <div key={i}>
              <h3>{f.title}</h3>
              {f.videoUrl && (
                <VideoWrapper>
                  <iframe src={f.videoUrl} title={f.title} allowFullScreen />
                </VideoWrapper>
              )}
              {f.file?.asset?.url && (
                <Link href={f.file.asset.url} target="_blank">
                  🎬 Télécharger
                </Link>
              )}
            </div>
          ))
        ) : (
          <p>Aucun film disponible.</p>
        )}
      </Section>
    </Container>
  );
}
