import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getSerieByTitle } from "../sanity/queries";
import { urlFor } from "../sanity/client";
import { LayoutGrid, List } from "lucide-react";
import ImageModal from "../components/ImageModal";

const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
  color: #fff;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
`;

const ToggleView = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  gap: 1rem;
`;

const ToggleButton = styled.button`
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 6px;
  color: #fff;
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: #333;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const Queue = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Card = styled.div`
  background: #1a1a1a;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #333;
  img {
    width: 100%;
    height: auto;
    border-radius: 4px;
    object-fit: cover;
    margin-bottom: 1rem;
  }
  h3 {
    margin: 0.5rem 0;
    color: #fff;
  }
  p {
    margin: 0.25rem 0;
    color: #ccc;
    font-size: 0.9rem;
  }
`;

export default function SerieDetail() {
  const { title } = useParams();
  const [serie, setSerie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("grid");
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    getSerieByTitle(decodeURIComponent(title)).then((data) => {
      setSerie(data);
      setLoading(false);
    });
  }, [title]);

  if (loading) return <Container>Chargement…</Container>;
  if (!serie) return <Container>Aucune série trouvée.</Container>;

  const renderPainting = (p) => (
    <Card key={p._id}>
      {p.mainImage && (
        <img
          onClick={() => setModalImage(urlFor(p.mainImage).width(1200).url())}
          src={urlFor(p.mainImage).width(800).url()}
          alt={p.title}
        />
      )}
      <h3>{p.title}</h3>
      {p.materials && (
        <p>
          <strong>Matériaux :</strong> {p.materials}
        </p>
      )}
      {p.dimensions && (
        <p>
          <strong>Dimensions :</strong> {p.dimensions}
        </p>
      )}
      {p.availability && (
        <p>
          <strong>Disponibilité :</strong> {p.availability}
        </p>
      )}
    </Card>
  );

  return (
    <Container className="fade-in">
      <Title>{serie.title}</Title>
      <ToggleView>
        <ToggleButton onClick={() => setView("grid")}>
          <LayoutGrid size={18} /> Vue grille
        </ToggleButton>
        <ToggleButton onClick={() => setView("list")}>
          <List size={18} /> Vue en liste
        </ToggleButton>
      </ToggleView>
      {view === "grid" ? (
        <Grid>{serie.paintings?.map(renderPainting)}</Grid>
      ) : (
        <Queue>{serie.paintings?.map(renderPainting)}</Queue>
      )}
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
