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

const ViewMore = styled(Link)`
  display: inline-block;
  margin-top: 1rem;
  padding: 0.8rem 1.6rem;
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

  return (
    <Container>
      <Title>{artist?.name || data?.name || "Papazoff"}</Title>

      {/* Aperçu Press Book */}
      <Section>
        <SectionTitle>Press Book</SectionTitle>
        {data?.pressBook?.length > 0 ? (
          <Card>
            <h3>{data.pressBook[0].title}</h3>
            {/* <p>{data.pressBook[0].description?.slice(0, 100)}...</p> */}
          </Card>
        ) : (
          <p>Aucun press book disponible.</p>
        )}
        <ViewMore to="/papazoff/pressbook">→ Voir tout</ViewMore>
      </Section>

      {/* Aperçu Films */}
      <Section>
        <SectionTitle>Films</SectionTitle>
        {data?.films?.length > 0 ? (
          <Card>
            <h3>{data.films[0].title}</h3>
            <p>{data.films[0].description?.slice(0, 100)}...</p>
          </Card>
        ) : (
          <p>Aucun film disponible.</p>
        )}
        <ViewMore to="/papazoff/films">→ Voir tout</ViewMore>
      </Section>

      {/* Aperçu Manifeste */}
      <Section>
        <SectionTitle>Manifeste</SectionTitle>
        {data?.manifeste?.length > 0 ? (
          <Card>
            <h3>{data.manifeste[0].title}</h3>
            <p>{data.manifeste[0].description?.slice(0, 100)}...</p>
          </Card>
        ) : (
          <p>Aucun manifeste disponible.</p>
        )}
        <ViewMore to="/papazoff/manifeste">→ Voir tout</ViewMore>
      </Section>

      {/* Aperçu Conférences */}
      <Section>
        <SectionTitle>Conférences</SectionTitle>
        {data?.conferences?.length > 0 ? (
          <Card>
            <h3>{data.conferences[0].title}</h3>
            <p>{data.conferences[0].description?.slice(0, 100)}...</p>
          </Card>
        ) : (
          <p>Aucune conférence disponible.</p>
        )}
        <ViewMore to="/papazoff/conferences">→ Voir tout</ViewMore>
      </Section>

      {/* Aperçu Poésie */}
      <Section>
        <SectionTitle>Poésie</SectionTitle>
        {data?.poesie?.length > 0 ? (
          <Card>
            <h3>{data.poesie[0].title}</h3>
            <p>{data.poesie[0].description?.slice(0, 100)}...</p>
          </Card>
        ) : (
          <p>Aucune poésie disponible.</p>
        )}
        <ViewMore to="/papazoff/poesie">→ Voir tout</ViewMore>
      </Section>
    </Container>
  );
}
