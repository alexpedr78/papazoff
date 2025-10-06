import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getPapazoffInfo } from "../sanity/queries";
import ImageModal from "../components/ImageModal";

const Container = styled.div`
  max-width: 1000px;
  margin: auto;
  padding: 2rem 1rem;
  color: #fff;
  user-select: none;
`;
const Header = styled.div`
  display: grid;
  grid-template-columns: 90px 1fr;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1.5rem;
`;
const Profile = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.15);
`;
const Title = styled.h1`
  font-size: clamp(2rem, 4.5vw, 3rem);
  margin: 0;
  background: linear-gradient(135deg, #fff 0%, #ccc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
const Card = styled.div`
  background: #111;
  padding: 1.25rem;
  border-radius: 12px;
  border: 1px solid #222;
  margin-bottom: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
  h3 {
    margin: 0 0 0.35rem;
  }
  p {
    color: #ccc;
    margin: 0.25rem 0 0.5rem;
  }
`;
const Meta = styled.p`
  color: #aaa;
  margin: 0.25rem 0 0.75rem;
  font-size: 0.95rem;
`;
const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 0.5rem;
`;
const Thumb = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 8px;
  cursor: zoom-in;
`;

export default function PapazoffConferences() {
  const [data, setData] = useState(null);
  const [modal, setModal] = useState(null);
  useEffect(() => {
    getPapazoffInfo().then(setData);
  }, []);
  if (!data) return <Container>Chargement…</Container>;

  return (
    <Container className="fade-in" onContextMenu={(e) => e.preventDefault()}>
      <Header>
        {data.conferencesProfileImageUrl && (
          <Profile src={data.conferencesProfileImageUrl} alt="" />
        )}
        <Title>Conférences</Title>
      </Header>

      {data.conferences?.length ? (
        data.conferences.map((c, i) => (
          <Card key={i}>
            {c.title && <h3>{c.title}</h3>}
            <Meta>
              {c.date && new Date(c.date).toLocaleDateString("fr-FR")}
              {c.location && ` • ${c.location}`}
            </Meta>
            {c.description && <p>{c.description}</p>}

            {/* Document associé */}
            {c.docUrl && (
              <p>
                📄{" "}
                <a
                  href={c.docUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  {c.docName || "Télécharger le document"}
                </a>
              </p>
            )}

            {/* Vidéos */}
            {c.videoUrl && (
              <div style={{ margin: ".75rem 0" }}>
                <iframe
                  src={c.videoUrl}
                  title={`conference-video-${i}`}
                  width="100%"
                  height="400"
                  allowFullScreen
                  style={{ border: "none", borderRadius: "8px" }}
                />
              </div>
            )}
            {c.videoFileUrl && (
              <p>
                🎬{" "}
                <a
                  href={c.videoFileUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  Télécharger la vidéo ({c.videoFileName || "fichier vidéo"})
                </a>
              </p>
            )}

            {/* Galerie */}
            {c.images?.length > 0 && (
              <Gallery>
                {c.images.map((img, idx) => (
                  <Thumb
                    key={idx}
                    src={img.url}
                    alt=""
                    draggable={false}
                    onClick={() => setModal(img.url)}
                  />
                ))}
              </Gallery>
            )}
          </Card>
        ))
      ) : (
        <p>Aucune conférence disponible.</p>
      )}

      {modal && (
        <ImageModal src={modal} alt="Aperçu" onClose={() => setModal(null)} />
      )}
    </Container>
  );
}
