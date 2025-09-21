// src/pages/Exhibitions.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  getCurrentExhibitions,
  getUpcomingExhibitions,
  getPastExhibitions,
} from "../sanity/queries";
import { urlFor } from "../sanity/client";

const Section = styled.section`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const SectionHeader = styled.h2`
  color: #fff;
  border-bottom: 2px solid #555;
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
  font-size: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
`;

const ExpoCard = styled.div`
  background: #111;
  border: 1px solid #222;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

  &:hover {
    transform: translateY(-4px);
    border-color: #444;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
  }
`;

const ExpoImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
`;

const ExpoInfo = styled.div`
  padding: 1rem;
  color: #fff;

  h3 {
    margin: 0.25rem 0 0.5rem;
    font-size: 1.2rem;
    font-weight: 500;
  }

  p {
    margin: 0.25rem 0;
    font-size: 0.9rem;
    color: #ccc;
  }

  a {
    display: inline-block;
    margin-top: 0.5rem;
    color: #87cefa;
    text-decoration: none;
    font-size: 0.9rem;
    &:hover {
      text-decoration: underline;
      color: #fff;
    }
  }
`;

export default function Exhibitions() {
  const [current, setCurrent] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);

  useEffect(() => {
    (async () => {
      setCurrent(await getCurrentExhibitions());
      setUpcoming(await getUpcomingExhibitions());
      setPast(await getPastExhibitions());
    })();
  }, []);

  const renderSection = (title, items) =>
    items.length > 0 && (
      <Section key={title}>
        <SectionHeader>{title}</SectionHeader>
        <Grid>
          {items.map((ex) => {
            const thumb =
              ex.image && urlFor(ex.image).width(400).height(240).url();
            return (
              <ExpoCard key={ex._id}>
                <Link to={`/expositions/${encodeURIComponent(ex.title)}`}>
                  {thumb ? (
                    <ExpoImage src={thumb} alt={ex.title} />
                  ) : (
                    <ExpoImage src="/placeholder.jpg" alt="Pas d'image" />
                  )}
                </Link>
                <ExpoInfo>
                  <h3>
                    <Link
                      to={`/expositions/${encodeURIComponent(ex.title)}`}
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      {ex.title}
                    </Link>
                  </h3>
                  <p>
                    {new Date(ex.startDate).toLocaleDateString("fr-FR")}
                    {ex.endDate &&
                      ` – ${new Date(ex.endDate).toLocaleDateString("fr-FR")}`}
                  </p>
                  {ex.location && <p>{ex.location}</p>}
                  {ex.description && <p>{ex.description}</p>}
                  <Link to={`/expositions/${encodeURIComponent(ex.title)}`}>
                    Voir plus →
                  </Link>
                </ExpoInfo>
              </ExpoCard>
            );
          })}
        </Grid>
      </Section>
    );

  return (
    <div className="fade-in">
      {renderSection("Expositions en cours", current)}
      {renderSection("Expositions à venir", upcoming)}
      {renderSection("Expositions passées", past)}
    </div>
  );
}
