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

// Conteneur de chaque section
const Section = styled.section`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

// Titre de section
const SectionHeader = styled.h2`
  color: #fff;
  border-bottom: 2px solid #555;
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
  font-size: 2rem;
`;

// Grille de cartes
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
`;

// Carte d’expo
const ExpoCard = styled.div`
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 6px;
  overflow: hidden;
  transition: transform 0.2s ease;
  &:hover {
    transform: translateY(-4px);
  }
`;

// Image de la carte
const ExpoImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
`;

// Contenu texte de la carte
const ExpoInfo = styled.div`
  padding: 0.75rem 1rem;
  color: #fff;
  h3 {
    margin: 0.25rem 0;
    font-size: 1.1rem;
  }
  p {
    margin: 0.15rem 0;
    font-size: 0.85rem;
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
