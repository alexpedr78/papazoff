import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { urlFor } from "../sanity/client";

import {
  getSeries,
  // getPaintings,
  getStudioPhotos,
  getToilesChezLesGens,
} from "../sanity/queries";

import ImageCarousel from "../components/ImageCarousel";

const Container = styled.div`
  min-height: calc(100vh - 80px);
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Section = styled.section`
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  margin-bottom: 1rem;
  color: #ffffff;
  text-align: center;
`;

const Subtitle = styled.p`
  text-align: center;
  color: #aaa;
  margin-bottom: 2rem;
`;

const ViewAllButton = styled.button`
  display: block;
  margin: 1rem auto 0 auto;
  padding: 0.75rem 1.5rem;
  background: #fff;
  color: #000;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #eee;
  }
`;

export default function Gallery() {
  // const [paintings, setPaintings] = useState([]);
  const [studioPhotos, setStudioPhotos] = useState([]);
  const [toiles, setToiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [series, setSeries] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const [studioData, toilesData, seriesData] = await Promise.all([
        // getPaintings(),
        getStudioPhotos(),
        getToilesChezLesGens(),
        getSeries(),
      ]);
      // setPaintings(paintingsData);
      console.log(seriesData);
      setStudioPhotos(studioData);
      setToiles(toilesData);
      setSeries(seriesData);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <Container>
        <SectionTitle>Chargement...</SectionTitle>
      </Container>
    );
  }

  return (
    <Container className="fade-in">
      {/* Séries */}
      <Section>
        <SectionTitle>Séries</SectionTitle>
        <Subtitle>Découvrez quelques aperçus des séries</Subtitle>
        <ImageCarousel
          images={series
            .map((s) => {
              // on ne génère l'URL que si asset._ref est présent
              return s.coverImage?.asset?._ref
                ? urlFor(s.coverImage).width(800).url()
                : null;
            })
            .filter(Boolean)}
        />
        <ViewAllButton onClick={() => navigate("/series")}>
          Voir toutes les séries
        </ViewAllButton>
      </Section>

      {/* Photos à l'Atelier */}
      <Section>
        <SectionTitle>Photos à l’Atelier</SectionTitle>
        <Subtitle>Un aperçu de l'atelier</Subtitle>
        <ImageCarousel
          images={studioPhotos.map((photo) => photo.imageUrl).filter(Boolean)}
        />
        <ViewAllButton onClick={() => navigate("/atelier")}>
          Voir toutes les photos
        </ViewAllButton>
      </Section>

      {/* Toiles chez les Gens */}
      <Section>
        <SectionTitle>Toiles chez les Gens</SectionTitle>
        <Subtitle>Quelques photos chez les collectionneurs</Subtitle>
        <ImageCarousel
          images={toiles
            .map((lieu) => (lieu.mainPhotoUrl ? lieu.mainPhotoUrl : null))
            .filter(Boolean)}
        />
        <ViewAllButton onClick={() => navigate("/chez-les-gens")}>
          Voir toutes les photos
        </ViewAllButton>
      </Section>
    </Container>
  );
}
