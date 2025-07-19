import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getStudioPhotos } from "../sanity/queries";

const Container = styled.div`
  min-height: calc(100vh - 80px);
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
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

  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
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

export default function Studio() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getStudioPhotos();
      setPhotos(data);
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
      <SectionTitle>Photos à l’Atelier</SectionTitle>
      <Grid>
        {photos.map((photo) => (
          <Card key={photo._id}>
            <img src={photo.imageUrl} alt={photo.title} draggable={false} />
            <h3>{photo.title}</h3>
            {photo.caption && <p>{photo.caption}</p>}
          </Card>
        ))}
      </Grid>
    </Container>
  );
}
