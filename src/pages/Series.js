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
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: border-color 0.2s ease;

  &:hover {
    border-color: #444;
  }

  h3 {
    margin: 1.2rem 1.5rem 0.5rem;
    color: #fff;
    font-size: 1.4rem;
    font-weight: 500;
  }

  p {
    margin: 0 1.5rem 1.5rem;
    color: #ccc;
    font-size: 0.95rem;
    line-height: 1.5;
  }
`;

const CoverImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-bottom: 1px solid #222;
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
            {s.coverImage?.asset?._ref && (
              <CoverImage
                src={urlFor(s.coverImage).width(1000).url()}
                alt={s.title}
              />
            )}
            <Link
              to={`/séries/${encodeURIComponent(s.title)}`}
              style={{ textDecoration: "none" }}
            >
              <h3>{s.title}</h3>

              {s.description && <p>{s.description}</p>}
            </Link>
            {s.paintings?.length > 0 && (
              <ImageCarousel
                images={s.paintings
                  .flatMap((p) => [p.mainImage, ...(p.gallery || [])])
                  .filter((img) => img?.asset?._ref)
                  .map((img) => urlFor(img).width(1200).url())}
              />
            )}
          </Card>
        ))}
      </List>
    </Container>
  );
}
