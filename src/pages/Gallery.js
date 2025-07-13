// src/pages/Gallery.js
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getPaintings,
  getStudioPhotos,
  getToilesChezLesGens,
} from "../sanity/queries";
import { urlFor } from "../sanity/client";

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
  margin-bottom: 2rem;
  color: #ffffff;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const Card = styled.div`
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }

  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    display: block;
  }

  h3 {
    margin: 1rem;
    color: #fff;
  }

  p {
    margin: 0 1rem 1rem;
    color: #ccc;
    font-size: 0.9rem;
  }
`;

export default function Gallery() {
  const [paintings, setPaintings] = useState([]);
  const [studioPhotos, setStudioPhotos] = useState([]);
  const [toiles, setToiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [paintingsData, studioData, toilesData] = await Promise.all([
        getPaintings(),
        getStudioPhotos(),
        getToilesChezLesGens(),
      ]);
      setPaintings(paintingsData);
      setStudioPhotos(studioData);
      setToiles(toilesData);
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
      {/* Œuvres en série */}
      <Section>
        <SectionTitle>Œuvres en série</SectionTitle>
        <Grid>
          {paintings.map((painting) => (
            <Card key={painting._id}>
              {painting.mainImage && (
                <img
                  src={urlFor(painting.mainImage).width(600).url()}
                  alt={painting.title}
                  draggable={false}
                />
              )}
              <h3>{painting.title}</h3>
              {painting.description && <p>{painting.description}</p>}
            </Card>
          ))}
        </Grid>
      </Section>

      {/* Photos à l'atelier */}
      {studioPhotos.length > 0 && (
        <Section>
          <SectionTitle>Photos à l’atelier</SectionTitle>
          <Grid>
            {studioPhotos.map((photo) => (
              <Card key={photo._id}>
                <img src={photo.imageUrl} alt={photo.title} draggable={false} />
                <h3>{photo.title}</h3>
                {photo.caption && <p>{photo.caption}</p>}
              </Card>
            ))}
          </Grid>
        </Section>
      )}

      {/* Toiles chez les gens */}
      {toiles.length > 0 && (
        <Section>
          <SectionTitle>Toiles chez les collectionneurs</SectionTitle>
          <Grid>
            {toiles.map((toile) => (
              <Card key={toile._id}>
                <img src={toile.imageUrl} alt={toile.title} draggable={false} />
                <h3>{toile.title}</h3>
                {toile.caption && <p>{toile.caption}</p>}
              </Card>
            ))}
          </Grid>
        </Section>
      )}
    </Container>
  );
}
