// src/pages/ExhibitionDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getExhibitionByTitle } from "../sanity/queries";
import { urlFor } from "../sanity/client";
import CommentSection from "../components/CommentSection";

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
  color: #fff;
`;

const Title = styled.h1`
  margin-bottom: 0.5rem;
`;

const Info = styled.p`
  color: #ccc;
  font-size: 0.9rem;
`;

const Section = styled.section`
  margin: 2rem 0;
`;

const DocumentsList = styled.ul`
  list-style: disc;
  padding-left: 1.2rem;
  li a {
    color: #87cefa;
    text-decoration: underline;
  }
`;

const VideoPlayer = styled.video`
  max-width: 100%;
  margin-bottom: 1rem;
`;

// Nouveaux styles pour la galerie complète
const GalleryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;
const GalleryImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
`;

export default function ExhibitionDetail() {
  const { title } = useParams();
  const [ex, setEx] = useState(null);

  useEffect(() => {
    getExhibitionByTitle(decodeURIComponent(title)).then(setEx);
  }, [title]);

  if (!ex) return <Container>Loading…</Container>;

  return (
    <Container>
      <Title>{ex.title}</Title>
      <Info>
        {new Date(ex.startDate).toLocaleDateString()}
        {ex.endDate && ` – ${new Date(ex.endDate).toLocaleDateString()}`}
        {ex.location && ` • ${ex.location}`}
      </Info>

      {/* Galerie d’images “en vedette” */}
      <Section>
        {ex.image && (
          <img
            src={urlFor(ex.image).width(1200).url()}
            alt={ex.title}
            style={{ width: "100%", marginBottom: "1rem" }}
          />
        )}
        {ex.featuredPaintings.map((fp) => (
          <img
            key={fp._id}
            src={fp.mainImage}
            alt={fp.title}
            style={{ width: "100%", marginBottom: "1rem" }}
          />
        ))}
      </Section>

      {/* Galerie complète */}
      <Section>
        <h3>Galerie complète</h3>
        {ex.gallery.length > 0 ? (
          <GalleryContainer>
            {ex.gallery.map((img, i) => (
              <GalleryImage
                key={i}
                src={img.url}
                alt={img.alt || `${ex.title} – image ${i + 1}`}
              />
            ))}
          </GalleryContainer>
        ) : (
          <p>Aucune image en galerie.</p>
        )}
      </Section>

      {/* Documents */}
      {ex.documents.length > 0 && (
        <Section>
          <h3>Documents</h3>
          <DocumentsList>
            {ex.documents.map((doc) => (
              <li key={doc.url}>
                <a href={doc.url} target="_blank" rel="noopener noreferrer">
                  {doc.fileName}
                </a>
              </li>
            ))}
          </DocumentsList>
        </Section>
      )}

      {/* Vidéos */}
      {ex.videos.length > 0 && (
        <Section>
          <h3>Vidéos</h3>
          {ex.videos.map((vid) => (
            <div key={vid.url}>
              {vid.title && <strong>{vid.title}</strong>}
              {vid.description && <p>{vid.description}</p>}
              <VideoPlayer controls src={vid.url}>
                Votre navigateur ne supporte pas la vidéo.
              </VideoPlayer>
            </div>
          ))}
        </Section>
      )}

      {/* Commentaires */}
      <CommentSection contentId={ex._id} contentType="exhibition" />
    </Container>
  );
}
