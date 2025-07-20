// src/pages/Exhibitions.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  getCurrentExhibitions,
  getUpcomingExhibitions,
  getPastExhibitions,
} from "../sanity/queries";
import { urlFor } from "../sanity/client";

const Section = styled.section`
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
`;
const SectionHeader = styled.h2`
  color: #fff;
  border-bottom: 2px solid #555;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
`;
const ExhibitionCard = styled.div`
  margin-bottom: 3rem;
`;
const ExhibitionTitle = styled.h3`
  margin: 0 0 0.5rem;
  color: #fff;
`;
const ExhibitionInfo = styled.p`
  margin: 0 0 1rem;
  color: #ccc;
  font-size: 0.9rem;
`;

const CarouselWrapper = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 1rem;
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
  ${(props) => (props.left ? "left: 1rem;" : "right: 1rem;")}
  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

export default function Exhibitions() {
  const [current, setCurrent] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);

  useEffect(() => {
    (async () => {
      setCurrent(await getCurrentExhibitions());
      setUpcoming(await getUpcomingExhibitions());
      setPast(await getPastExhibitions());
    })();
  }, []);

  const renderSection = (title, items) =>
    items.length > 0 && (
      <Section>
        <SectionHeader>{title}</SectionHeader>
        {items.map((ex) => (
          <ExhibitionCard key={ex._id}>
            <Link
              to={`/expositions/${encodeURIComponent(ex.title)}`}
              style={{ textDecoration: "none" }}
            >
              {" "}
              <ExhibitionTitle>{ex.title}</ExhibitionTitle>
            </Link>
            <ExhibitionInfo>
              {new Date(ex.startDate).toLocaleDateString()}
              {ex.endDate && ` – ${new Date(ex.endDate).toLocaleDateString()}`}
              {ex.location && ` • ${ex.location}`}
            </ExhibitionInfo>

            <Link to={`/expositions/${encodeURIComponent(ex.title)}`}>
              {" "}
              <ImageCarousel
                images={[
                  ex.image && urlFor(ex.image).width(1200).url(),
                  ...(ex.featuredPaintings?.map((fp) =>
                    fp.mainImage ? urlFor(fp.mainImage).width(1200).url() : null
                  ) || []),
                ].filter(Boolean)}
              />
            </Link>
          </ExhibitionCard>
        ))}
      </Section>
    );

  return (
    <div className="fade-in">
      {renderSection("Exposition en cours", current)}
      {renderSection("Exposition à venir", upcoming)}
      {renderSection("Expositions passées", past)}
    </div>
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
