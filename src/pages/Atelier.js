import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getStudioPhotos } from "../sanity/queries";
import ImageModal from "../components/ImageModal";

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
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const Card = styled.div`
  background: #111;
  border: 1px solid #222;
  border-radius: 12px;
  overflow: hidden;
  padding-bottom: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: border-color 0.2s ease;

  &:hover {
    border-color: #444;
  }

  img {
    width: 100%;
    height: 280px;
    object-fit: cover;
    border-radius: 8px 8px 0 0;
    cursor: zoom-in;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: scale(1.03);
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.6);
    }
  }

  h3 {
    margin: 1rem;
    color: #fff;
    font-size: 1.2rem;
  }

  p {
    margin: 0 1rem 1rem;
    color: #ccc;
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;

export default function Atelier() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalImage, setModalImage] = useState(null);

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
        <Title>Chargement…</Title>
      </Container>
    );
  }

  return (
    <Container className="fade-in">
      <Title>Photos à l’Atelier</Title>
      <Grid>
        {photos.map((photo) => (
          <Card key={photo._id}>
            <img
              src={photo.imageUrl}
              alt={photo.title}
              draggable={false}
              onClick={() => setModalImage(photo.imageUrl)}
            />
            <h3>{photo.title}</h3>
            {photo.caption && <p>{photo.caption}</p>}
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
