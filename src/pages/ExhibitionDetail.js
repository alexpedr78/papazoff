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
  font-size: 2rem;
`;

const Info = styled.p`
  color: #ccc;
  font-size: 0.9rem;
`;

const Section = styled.section`
  margin: 2rem 0;
`;

const SectionTitle = styled.h3`
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: #fff;
  border-bottom: 1px solid #555;
  padding-bottom: 0.5rem;
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

// Responsive main image
const MainImageWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  margin: 1rem 0;
`;
const MainImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  border-radius: 6px;

  @media (max-width: 600px) {
    max-height: 250px;
  }
`;

// Featured paintings grid
const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
`;
const FeaturedImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
`;

// Full gallery grid
const GalleryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;
const GalleryImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
`;

const VideoSection = styled.div`
  margin-bottom: 1rem;
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
        {new Date(ex.startDate).toLocaleDateString("fr-FR")}
        {ex.endDate && ` – ${new Date(ex.endDate).toLocaleDateString("fr-FR")}`}
        {ex.location && ` • ${ex.location}`}
      </Info>

      {/* Main image */}
      {ex.image && (
        <MainImageWrapper>
          <MainImage src={urlFor(ex.image).width(1200).url()} alt={ex.title} />
        </MainImageWrapper>
      )}

      {/* Featured paintings */}
      {ex.featuredPaintings?.length > 0 && (
        <Section>
          <SectionTitle>Images épinglées</SectionTitle>
          <FeaturedGrid>
            {ex.featuredPaintings.map((fp) => (
              <FeaturedImage
                key={fp._id}
                src={urlFor(fp.mainImage).width(600).url()}
                alt={fp.title}
              />
            ))}
          </FeaturedGrid>
        </Section>
      )}

      {/* Full gallery */}
      <Section>
        <SectionTitle>Galerie complète</SectionTitle>
        {ex.gallery?.length > 0 ? (
          <GalleryContainer>
            {ex.gallery.map((img, i) => (
              <GalleryImage
                key={i}
                src={img.url}
                alt={img.alt || `${ex.title} – image ${i + 1}`}
                style={{
                  cursor: "zoom-in",
                  width: "100%",
                  marginBottom: "1rem",
                }}
              />
            ))}
          </GalleryContainer>
        ) : (
          <p>Aucune image en galerie.</p>
        )}
      </Section>

      {/* Documents */}
      {ex.documents?.length > 0 && (
        <Section>
          <SectionTitle>Documents</SectionTitle>
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

      {/* Videos */}
      {ex.videos?.length > 0 && (
        <Section>
          <SectionTitle>Vidéos</SectionTitle>
          {ex.videos.map((vid) => (
            <VideoSection key={vid.url}>
              {vid.title && <strong>{vid.title}</strong>}
              {vid.description && <p>{vid.description}</p>}
              <VideoPlayer controls src={vid.url}>
                Votre navigateur ne supporte pas la vidéo.
              </VideoPlayer>
            </VideoSection>
          ))}
        </Section>
      )}

      {/* Comments */}
      <CommentSection contentId={ex._id} contentType="exhibition" />
    </Container>
  );
}
