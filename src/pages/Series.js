import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getSeries } from "../sanity/queries";
import { urlFor } from "../sanity/client";
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

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
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
        <SectionTitle>Chargement...</SectionTitle>
      </Container>
    );
  }

  return (
    <Container className="fade-in">
      <SectionTitle>Toutes les Séries</SectionTitle>
      <List>
        {series.map((s) => (
          <Card key={s._id}>
            <Link
              to={`/séries/${encodeURIComponent(s.title)}`}
              style={{ textDecoration: "none" }}
            >
              <h3>{s.title}</h3>
            </Link>
            {s.description && <p>{s.description}</p>}
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
