// src/pages/PapazoffFilms.js
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
  margin-bottom: 2rem;
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
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #222;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
  transition: border-color 0.2s ease;

  &:hover {
    border-color: #444;
  }

  h3 {
    margin-bottom: 0.5rem;
  }

  p {
    color: #ccc;
    margin-bottom: 1rem;
    line-height: 1.5;
  }

  video {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.5);
    outline: none;
    cursor: pointer;
    display: block;
    margin: 0 auto;
    background: #000;
  }
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
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.6);
  }
`;

export default function PapazoffFilms() {
  const [data, setData] = useState(null);
  const [modal, setModal] = useState(null);

  useEffect(() => {
    getPapazoffInfo().then(setData);
  }, []);

  if (!data) return <Container>Chargement…</Container>;

  return (
    <Container className="fade-in" onContextMenu={(e) => e.preventDefault()}>
      <Header>
        {data.filmsProfileImageUrl && (
          <Profile src={data.filmsProfileImageUrl} alt="Profil section Films" />
        )}
        <Title>Films</Title>
      </Header>

      {data.films?.length ? (
        data.films.map((f, i) => (
          <Card key={i}>
            {f.title && <h3>{f.title}</h3>}
            {f.description && <p>{f.description}</p>}

            {/* Vidéo locale */}
            {f.fileUrl && (
              <video
                controls
                playsInline
                preload="metadata"
                poster="/video-placeholder.jpg"
                src={f.fileUrl}
                onClick={(e) => e.currentTarget.requestFullscreen()}
              >
                Votre navigateur ne supporte pas la vidéo.
              </video>
            )}

            {/* Vidéo externe */}
            {!f.fileUrl && f.videoUrl && (
              <iframe
                src={f.videoUrl}
                title={`film-video-${i}`}
                width="100%"
                height="400"
                allowFullScreen
                style={{
                  border: "none",
                  borderRadius: "8px",
                  marginTop: "0.75rem",
                }}
              />
            )}

            {/* Galerie d’images optionnelle */}
            {f.images?.length > 0 && (
              <Gallery>
                {f.images.map((img, idx) => (
                  <Thumb
                    key={idx}
                    src={img.url}
                    alt={`image ${idx + 1}`}
                    draggable={false}
                    onClick={() => setModal(img.url)}
                  />
                ))}
              </Gallery>
            )}
          </Card>
        ))
      ) : (
        <p>Aucun film disponible.</p>
      )}

      {modal && (
        <ImageModal src={modal} alt="Aperçu" onClose={() => setModal(null)} />
      )}
    </Container>
  );
}
