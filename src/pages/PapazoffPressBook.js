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
    margin: 0.25rem 0 0.75rem;
  }
  a {
    color: #87cefa;
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
  &:hover {
    opacity: 0.95;
  }
`;

export default function PapazoffPressBook() {
  const [data, setData] = useState(null);
  const [modal, setModal] = useState(null);

  useEffect(() => {
    getPapazoffInfo().then(setData);
  }, []);
  if (!data) return <Container>Chargement…</Container>;

  return (
    <Container className="fade-in" onContextMenu={(e) => e.preventDefault()}>
      <Header>
        {data.pressBookProfileImageUrl && (
          <Profile src={data.pressBookProfileImageUrl} alt="" />
        )}
        <Title>Press Book</Title>
      </Header>

      {data.pressBook?.length ? (
        data.pressBook.map((pb, i) => (
          <Card key={i}>
            {pb.title && <h3>{pb.title}</h3>}
            {pb.description && <p>{pb.description}</p>}

            {/* PDF / Fichier */}
            {pb.fileUrl && (
              <p>
                📄{" "}
                <a
                  href={pb.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  {pb.fileName || "Télécharger le fichier"}
                </a>
              </p>
            )}

            {/* Vidéo intégrée (YouTube/Vimeo) */}
            {pb.videoUrl && (
              <div style={{ margin: ".75rem 0" }}>
                <iframe
                  src={pb.videoUrl}
                  title={`pressbook-video-${i}`}
                  width="100%"
                  height="400"
                  allowFullScreen
                  style={{ border: "none", borderRadius: "8px" }}
                />
              </div>
            )}

            {/* Vidéo uploadée */}
            {pb.videoFileUrl && (
              <p>
                🎬{" "}
                <a
                  href={pb.videoFileUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  Télécharger la vidéo ({pb.videoFileName || "fichier vidéo"})
                </a>
              </p>
            )}

            {/* Galerie */}
            {pb.images?.length > 0 && (
              <Gallery>
                {pb.images.map((img, idx) => (
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
        <p>Aucun élément.</p>
      )}

      {modal && (
        <ImageModal src={modal} alt="Aperçu" onClose={() => setModal(null)} />
      )}
    </Container>
  );
}
