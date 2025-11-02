import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getSerieByTitle } from "../sanity/queries";
import { urlFor } from "../sanity/client";
import { LayoutGrid, List } from "lucide-react";
import ImageModal from "../components/ImageModal";

const Container = styled.div`
  max-width: 1000px;
  margin: 3rem auto;
  padding: 0 1.5rem;
  color: #fff;
`;

const Title = styled.h1`
  text-align: center;
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 300;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #ffffff 0%, #cccccc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ToggleView = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  gap: 1rem;
`;

const ToggleButton = styled.button`
  background: #111;
  border: 1px solid #333;
  border-radius: 8px;
  color: #fff;
  padding: 0.6rem 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    background: #222;
    border-color: #555;
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
  background: #111;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #222;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: border-color 0.2s ease;

  img {
    width: 100%;
    height: 300px;
    border-radius: 8px;
    object-fit: cover;
    margin-bottom: 1rem;
    cursor: zoom-in;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: scale(1.03);
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.6);
    }
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
      {p.description && <p>{p.description}</p>}

      {p.year && (
        <p>
          <strong>Année :</strong> {p.year}
        </p>
      )}
      {p.dimensions && (
        <p>
          <strong>Dimensions :</strong> {p.dimensions}
        </p>
      )}
      {p.medium && (
        <p>
          <strong>Technique :</strong> {p.medium}
        </p>
      )}
      {typeof p.price === "number" && (
        <p>
          <strong>Prix :</strong> {p.price} €
        </p>
      )}
      {p.available !== undefined && (
        <p>
          <strong>Disponibilité :</strong>{" "}
          {p.available ? "Disponible" : "Vendu"}
        </p>
      )}

      {/* Galerie secondaire */}
      {p.gallery?.length > 0 &&
        p.gallery.map((img, i) => (
          <img
            key={i}
            src={urlFor(img).width(600).url()}
            alt={`${p.title} – ${i + 1}`}
            onClick={() => setModalImage(urlFor(img).width(1200).url())}
          />
        ))}
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
      {serie.documentUrl && (
        <div
          style={{
            background: "#111",
            border: "1px solid #222",
            borderRadius: "12px",
            padding: "1.5rem",
            margin: "3rem 0",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
          }}
        >
          {/* <h3>{serie.documentName}</h3> */}
          {serie.documentUrl.endsWith(".pdf") ? (
            <iframe
              src={`${serie.documentUrl}#toolbar=0`}
              title={`Document PDF – ${serie.documentName || serie.title}`}
              width="100%"
              height="600"
              style={{
                border: "1px solid #333",
                borderRadius: "8px",
                background: "#000",
                boxShadow: "inset 0 0 10px rgba(255,255,255,0.05)",
              }}
            ></iframe>
          ) : (
            <iframe
              src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
                serie.documentUrl
              )}`}
              title={`Document Word – ${serie.documentName || serie.title}`}
              width="100%"
              height="600"
              style={{
                border: "1px solid #333",
                borderRadius: "8px",
                background: "#000",
                boxShadow: "inset 0 0 10px rgba(255,255,255,0.05)",
              }}
              frameBorder="0"
            ></iframe>
          )}
        </div>
      )}
    </Container>
  );
}
