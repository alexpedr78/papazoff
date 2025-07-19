import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getToilesChezLesGens } from "../sanity/queries";
import ImageCarousel from "../components/ImageCarousel";

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
  padding-bottom: 1rem;

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

export default function ChezLesGens() {
  const [lieux, setLieux] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getToilesChezLesGens();
      setLieux(data);
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
      <SectionTitle>Toiles chez les Gens</SectionTitle>
      <Grid>
        {lieux.map((lieu) => (
          <Card key={lieu._id}>
            <h3>{lieu.title}</h3>
            {lieu.description && <p>{lieu.description}</p>}
            <ImageCarousel
              images={[
                // ...(lieu.mainPhotoUrl ? [lieu.mainPhotoUrl] : []),
                ...(lieu.photos?.map((p) => p.asset.url) || []),
              ]}
            />
          </Card>
        ))}
      </Grid>
    </Container>
  );
}
