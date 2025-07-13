// src/pages/Exhibitions.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getExhibitions } from "../sanity/queries";
import { urlFor } from "../sanity/client";
import CommentSection from "../components/CommentSection";

const ExhibitionsContainer = styled.div`
  min-height: calc(100vh - 80px);
  padding: 2rem 0;
`;

const ExhibitionsHeader = styled.h2`
  text-align: center;
  margin-bottom: 3rem;
`;

const ExhibitionCard = styled.div`
  max-width: 800px;
  margin: 0 auto 4rem;
  padding: 0 1rem;
`;

const ExhibitionTitle = styled.h3`
  margin-bottom: 0.5rem;
  color: #fff;
`;

const ExhibitionInfo = styled.p`
  margin-bottom: 1.5rem;
  color: #ccc;
  font-size: 0.9rem;
`;

const CarouselWrapper = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 8px;
`;

const Slides = styled.div`
  display: flex;
  transition: transform 0.4s ease;
`;

const Slide = styled.img`
  min-width: 100%;
  height: 450px;
  object-fit: cover;
  user-select: none;
  -webkit-user-drag: none;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  z-index: 10;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  padding: 0.5rem;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  transform: translateY(-50%);

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }

  ${(props) => (props.left ? "left: 1rem;" : "right: 1rem;")}
`;

export default function Exhibitions() {
  console.log("Exhibitions component mounted");

  const [exhibitions, setExhibitions] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getExhibitions();
      console.log("Exhibitions fetched:", data);
      setExhibitions(data);
    })();
  }, []);

  return (
    <ExhibitionsContainer className="fade-in">
      <ExhibitionsHeader>Expositions</ExhibitionsHeader>
      {exhibitions.map((ex) => (
        <ExhibitionCard key={ex._id}>
          <ExhibitionTitle>{ex.title}</ExhibitionTitle>
          <ExhibitionInfo>
            {new Date(ex.startDate).toLocaleDateString()}
            {ex.endDate && ` – ${new Date(ex.endDate).toLocaleDateString()}`}
            {ex.location && ` • ${ex.location}`}
          </ExhibitionInfo>

          <ImageCarousel
            images={[
              ex.image ? urlFor(ex.image).width(1200).url() : null,
              ...(ex.featuredPaintings?.map((fp) =>
                fp.mainImage ? urlFor(fp.mainImage).width(1200).url() : null
              ) || []),
            ].filter(Boolean)}
          />
          <CommentSection contentId={ex._id} contentType="exhibition" />
        </ExhibitionCard>
      ))}
    </ExhibitionsContainer>
  );
}

function ImageCarousel({ images }) {
  const [current, setCurrent] = useState(0);
  const len = images.length;

  const prev = () => setCurrent(current === 0 ? len - 1 : current - 1);
  const next = () => setCurrent(current === len - 1 ? 0 : current + 1);

  return (
    <CarouselWrapper>
      <Slides style={{ transform: `translateX(-${current * 100}%)` }}>
        {images.map((src, i) => (
          <Slide src={src} key={i} alt={`Slide ${i + 1}`} draggable={false} />
        ))}
      </Slides>
      {len > 1 && (
        <>
          <ArrowButton left onClick={prev}>
            <ChevronLeft size={24} />
          </ArrowButton>
          <ArrowButton onClick={next}>
            <ChevronRight size={24} />
          </ArrowButton>
        </>
      )}
    </CarouselWrapper>
  );
}
