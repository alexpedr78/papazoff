// src/pages/Papazoff.js
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getPapazoffInfo, getArtistInfo } from "../sanity/queries";
import { Link } from "react-router-dom";

const Container = styled.div`
  padding: 2rem 1rem;
  max-width: 1000px;
  margin: auto;
  color: #fff;
  user-select: none;
`;

const Title = styled.h1`
  text-align: center;
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 300;
  margin-bottom: 2rem;
  line-height: 1.3;
  background: linear-gradient(135deg, #ffffff 0%, #cccccc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Section = styled.section`
  margin-bottom: 2.5rem;
  background: #111;
  border-radius: 12px;
  border: 1px solid #222;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6);
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SectionImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 12px;
  object-fit: cover;
  flex-shrink: 0;
`;

const SectionText = styled.div`
  flex: 1;
`;

const SectionTitle = styled.h2`
  font-size: 1.4rem;
  margin: 0;
  color: #fff;
`;

const ViewMore = styled(Link)`
  display: inline-block;
  margin-top: 1rem;
  padding: 0.7rem 1.2rem;
  border-radius: 8px;
  background: #1a1a1a;
  color: #ecf2f7ff;
  font-weight: 600;
  text-decoration: none;
  border: 1px solid #333;
  transition: all 0.2s ease;

  &:hover {
    background: #dee7ecff;
    color: #0a0a0a;
    border-color: #aec6d5ff;
  }
`;

export default function Papazoff() {
  const [data, setData] = useState(null);
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getPapazoffInfo(), getArtistInfo()])
      .then(([papazoff, artist]) => {
        setData(papazoff);
        setArtist(artist);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Container>Chargement…</Container>;
  if (!data) return <Container>Pas de données disponibles.</Container>;

  return (
    <Container className="fade-in">
      <Title>{artist?.name || data?.name || "Georges Papazoff"}</Title>

      {/* Sections */}
      {[
        {
          key: "pressBook",
          title: "Press Book",
          link: "/papazoff/pressbook",
          img: data.pressBookProfileImageUrl,
          arr: data.pressBook,
        },
        {
          key: "films",
          title: "Films",
          link: "/papazoff/films",
          img: data.filmsProfileImageUrl,
          arr: data.films,
        },
        {
          key: "manifeste",
          title: "Manifeste",
          link: "/papazoff/manifeste",
          img: data.manifesteProfileImageUrl,
          arr: data.manifeste,
        },
        {
          key: "conferences",
          title: "Conférences",
          link: "/papazoff/conferences",
          img: data.conferencesProfileImageUrl,
          arr: data.conferences,
        },
        {
          key: "poesie",
          title: "Poésie",
          link: "/papazoff/poesie",
          img: data.poesieProfileImageUrl,
          arr: data.poesie,
        },
      ].map((section) => (
        <Section key={section.key}>
          <SectionHeader>
            {section.img && <SectionImage src={section.img} alt="" />}
            <SectionText>
              <SectionTitle>{section.title}</SectionTitle>
            </SectionText>
          </SectionHeader>
          <ViewMore to={section.link}>→ Voir tout</ViewMore>
        </Section>
      ))}
    </Container>
  );
}
