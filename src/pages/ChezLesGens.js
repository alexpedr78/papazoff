import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getToilesChezLesGens } from "../sanity/queries";
import ImageCarousel from "../components/ImageCarousel";
import ImageModal from "../components/ImageModal";
import { urlFor } from "../sanity/client";

const Container = styled.div`
  min-height: calc(100vh - 80px);
  padding: 2rem 1rem;
  max-width: 1000px;
  margin: 0 auto;
  color: #fff;
`;

const Title = styled.h1`
  text-align: center;
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 300;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, #ffffff 0%, #cccccc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const Card = styled.div`
  background: #111;
  border: 1px solid #222;
  border-radius: 12px;
  overflow: hidden;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: border-color 0.2s ease;

  &:hover {
    border-color: #444;
  }

  h3 {
    margin-bottom: 0.8rem;
    color: #fff;
    font-size: 1.3rem;
    font-weight: 500;
  }

  p {
    margin-bottom: 1.2rem;
    color: #ccc;
    font-size: 0.95rem;
    line-height: 1.5;
  }
`;

export default function ChezLesGens() {
  const [lieux, setLieux] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalImage, setModalImage] = useState(null);

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
        <Title>Chargement…</Title>
      </Container>
    );
  }

  return (
    <Container className="fade-in">
      <Title>Toiles chez les Gens</Title>
      <Grid>
        {lieux.map((lieu) => (
          <Card key={lieu._id}>
            <h3>{lieu.title}</h3>
            {lieu.description && <p>{lieu.description}</p>}
            <ImageCarousel
              images={[
                ...(lieu.mainPhoto
                  ? [urlFor(lieu.mainPhoto).width(800).url()]
                  : []),
                ...(lieu.photos?.map((p) => urlFor(p).width(800).url()) || []),
              ]}
              onImageClick={(src) => setModalImage(src)}
            />
          </Card>
        ))}
      </Grid>

      {modalImage && (
        <ImageModal
          src={modalImage}
          alt="Aperçu"
          onClose={() => setModalImage(null)}
        />
      )}
    </Container>
  );
}
