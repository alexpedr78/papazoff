import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getPapazoffInfo, getArtistInfo } from "../sanity/queries";

const Container = styled.div`
  padding: 3rem 1rem;
  max-width: 1100px;
  margin: auto;
  color: #fff;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 5vw, 3.8rem);
  font-weight: 300;
  line-height: 1.4;
  background: linear-gradient(135deg, #ffffff 0%, #cccccc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SectionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  background: #111;
  border: 1px solid #222;
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: 180px;
  background: #1a1a1a url(${(props) => props.img || "/placeholder.jpg"}) center /
    cover no-repeat;
  border-bottom: 1px solid #333;
`;

const CardContent = styled.div`
  padding: 1.5rem;
  flex: 1;

  h3 {
    margin-bottom: 0.5rem;
    font-size: 1.3rem;
    color: #fff;
  }

  p {
    font-size: 0.95rem;
    color: #ccc;
    line-height: 1.5;
  }
`;

const ViewMore = styled.div`
  margin-top: 1rem;
  font-weight: 600;
  color: #b0d2f1;
  font-size: 0.95rem;
  transition: color 0.2s ease;

  ${Card}:hover & {
    color: #fff;
  }
`;

export default function Papazoff() {
  const [data, setData] = useState(null);
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getPapazoffInfo(), getArtistInfo()])
      .then(([papazoff, artistInfo]) => {
        setData(papazoff);
        setArtist(artistInfo);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Container>Chargement…</Container>;
  if (!data) return <Container>Pas de données disponibles.</Container>;

  const sections = [
    {
      key: "pressBook",
      title: "Press Book",
      link: "/papazoff/pressbook",
      img: data.pressBookProfileImageUrl,
      desc:
        data.pressBook?.[0]?.description ||
        "Découvrez les publications et articles autour de l’artiste.",
    },
    {
      key: "films",
      title: "Films",
      link: "/papazoff/films",
      img: data.filmsProfileImageUrl,
      desc:
        data.films?.[0]?.description ||
        "Entretiens, documentaires et œuvres audiovisuelles.",
    },
    {
      key: "manifeste",
      title: "Manifeste",
      link: "/papazoff/manifeste",
      img: data.manifesteProfileImageUrl,
      desc:
        data.manifeste?.[0]?.description ||
        "Textes fondateurs et réflexions sur la peinture.",
    },
    {
      key: "conferences",
      title: "Conférences",
      link: "/papazoff/conferences",
      img: data.conferencesProfileImageUrl,
      desc:
        data.conferences?.[0]?.description ||
        "Retrouvez les échanges et présentations de Georges Papazoff.",
    },
    {
      key: "poesie",
      title: "Poésie",
      link: "/papazoff/poesie",
      img: data.poesieProfileImageUrl,
      desc:
        data.poesie?.[0]?.description ||
        "Les écrits poétiques et les voix de l’artiste.",
    },
  ];

  return (
    <Container className="fade-in">
      <Header>
        <div>
          <Title>{artist?.name || data?.name || "Georges Papazoff"}</Title>
        </div>
      </Header>

      <SectionsGrid>
        {sections.map((section) => (
          <ViewMore>
            <Card key={section.key} to={section.link}>
              <CardImage img={section.img} />
              <CardContent>
                <h3>{section.title}</h3>
              </CardContent>
            </Card>
          </ViewMore>
        ))}
      </SectionsGrid>
    </Container>
  );
}
