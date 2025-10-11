// src/pages/Series.js
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getSeries } from "../sanity/queries";
import { urlFor } from "../sanity/client";
import ImageCarousel from "../components/ImageCarousel";

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

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const Card = styled.div`
  background: #111;
  border: 1px solid #222;
  border-radius: 12px;
  overflow: hidden;
  color: inherit;
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    border-color: #444;
    box-shadow: 0 8px 22px rgba(0, 0, 0, 0.5);
  }
`;

const CardClickableArea = styled(Link)`
  display: block;
  color: inherit;
  text-decoration: none;
`;

const CoverImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-bottom: 1px solid #222;
  transition: transform 0.4s ease;

  ${Card}:hover & {
    transform: scale(1.03);
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;

  h3 {
    margin-bottom: 0.8rem;
    color: #fff;
    font-size: 1.4rem;
    font-weight: 500;
  }

  p {
    color: #ccc;
    font-size: 0.95rem;
    line-height: 1.5;
  }
`;

const ViewButton = styled.div`
  display: inline-block;
  margin-top: 1rem;
  padding: 0.6rem 1.2rem;
  border: 1px solid #333;
  border-radius: 8px;
  color: #ecf2f7;
  font-weight: 600;
  font-size: 0.9rem;
  background: #1a1a1a;
  transition: all 0.2s ease;

  ${Card}:hover & {
    background: #dee7ec;
    color: #0a0a0a;
    border-color: #aec6d5;
  }
`;

// 🧠 Le conteneur du carrousel neutralise le clic de la carte
const CarouselWrapper = styled.div`
  pointer-events: none; /* bloque les clics sur le parent */
  position: relative;

  .carousel-interactive {
    pointer-events: all; /* réactive les clics internes (flèches, drag) */
  }
`;

export default function Series() {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getSeries();
      setSeries(data);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <Container>
        <Title>Chargement...</Title>
      </Container>
    );
  }

  return (
    <Container className="fade-in">
      <Title>Toutes les Séries</Title>
      <List>
        {series.map((s) => (
          <Card key={s._id}>
            <CardClickableArea to={`/séries/${encodeURIComponent(s.title)}`}>
              {s.coverImage?.asset?._ref && (
                <CoverImage
                  src={urlFor(s.coverImage).width(1000).url()}
                  alt={s.title}
                />
              )}

              <CardContent>
                <h3>{s.title}</h3>
                {s.description && <p>{s.description}</p>}
                <ViewButton>→ Voir la série</ViewButton>
              </CardContent>
            </CardClickableArea>

            {/* ✅ Carrousel cliquable indépendamment */}
            {s.paintings?.length > 0 && (
              <CarouselWrapper>
                <div className="carousel-interactive">
                  <ImageCarousel
                    images={s.paintings
                      .flatMap((p) => [p.mainImage, ...(p.gallery || [])])
                      .filter((img) => img?.asset?._ref)
                      .map((img) => urlFor(img).width(1200).url())}
                  />
                </div>
              </CarouselWrapper>
            )}
          </Card>
        ))}
      </List>
    </Container>
  );
}
