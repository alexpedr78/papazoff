// src/pages/ExhibitionDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getExhibitionByTitle } from "../sanity/queries";
import { urlFor } from "../sanity/client";
import CommentSection from "../components/CommentSection";
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
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #ffffff 0%, #cccccc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Info = styled.p`
  text-align: center;
  font-size: 1rem;
  color: #aaa;
  margin-bottom: 2rem;
`;

const MainImageWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  margin: 2rem 0;
`;

const MainImage = styled.img`
  width: 100%;
  max-height: 450px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const Section = styled.section`
  margin: 3rem 0;
  padding: 2rem;
  background: #111;
  border-radius: 12px;
  border: 1px solid #222;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`;

const SectionTitle = styled.h3`
  font-size: 1.6rem;
  margin-bottom: 1.5rem;
  color: #fff;
  border-bottom: 2px solid #333;
  padding-bottom: 0.5rem;
`;

const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
`;

const FeaturedImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 8px;
  cursor: zoom-in;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.6);
  }
`;

const GalleryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 8px;
  cursor: zoom-in;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.6);
  }
`;

const DocumentCard = styled.a`
  display: inline-block;
  background: #1a1a1a;
  border: 1px solid #333;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  margin: 0.5rem;
  color: #87cefa;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    border-color: #555;
    color: #fff;
  }
`;

const VideoWrapper = styled.div`
  margin-bottom: 1.5rem;
  video {
    width: 100%;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  }
`;

export default function ExhibitionDetail() {
  const { title } = useParams();
  const [ex, setEx] = useState(null);
  const [modalImage, setModalImage] = useState(null);

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

      {ex.image && (
        <MainImageWrapper>
          <MainImage src={urlFor(ex.image).width(1200).url()} alt={ex.title} />
        </MainImageWrapper>
      )}

      {/* Description */}
      {ex.description && (
        <Section>
          <SectionTitle>Description</SectionTitle>
          <p>{ex.description}</p>
        </Section>
      )}

      {/* Images épinglées */}
      {ex.featuredPaintings?.length > 0 && (
        <Section>
          <SectionTitle>Images épinglées</SectionTitle>
          <FeaturedGrid>
            {ex.featuredPaintings.map((fp) => (
              <FeaturedImage
                key={fp._id}
                src={urlFor(fp.mainImage).width(600).url()}
                alt={fp.title}
                onClick={() => setModalImage(urlFor(fp.mainImage).url())}
              />
            ))}
          </FeaturedGrid>
        </Section>
      )}

      {/* Galerie complète */}
      <Section>
        <SectionTitle>Galerie complète</SectionTitle>
        {ex.gallery?.length > 0 ? (
          <GalleryContainer>
            {ex.gallery.map((img, i) => (
              <GalleryImage
                key={i}
                src={img.url}
                alt={img.alt || `${ex.title} – image ${i + 1}`}
                onClick={() => setModalImage(img.url)}
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
          {ex.documents.map((doc) => (
            <DocumentCard
              key={doc.url}
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              📄 {doc.fileName}
            </DocumentCard>
          ))}
        </Section>
      )}

      {/* Vidéos */}
      {ex.videos?.length > 0 && (
        <Section>
          <SectionTitle>Vidéos</SectionTitle>
          {ex.videos.map((vid, i) => (
            <VideoWrapper key={i}>
              {vid.title && <strong>{vid.title}</strong>}
              {vid.description && <p>{vid.description}</p>}
              {vid.file?.asset?.url ? (
                <video controls src={vid.file.asset.url}>
                  Votre navigateur ne supporte pas la vidéo.
                </video>
              ) : (
                <p>Pas de fichier vidéo disponible.</p>
              )}
            </VideoWrapper>
          ))}
        </Section>
      )}

      {/* Commentaires */}
      <Section>
        <SectionTitle>Commentaires</SectionTitle>
        <CommentSection contentId={ex._id} contentType="exhibition" />
      </Section>

      {modalImage && (
        <ImageModal
          src={modalImage}
          alt="Aperçu"
          onClose={() => setModalImage(null)}
        />
      )}
    </Container>
  );
}
