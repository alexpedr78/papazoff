import React, { useRef } from "react";
import styled from "styled-components";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CarouselWrapper = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 8px;
`;

const Slides = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  gap: 1rem;
  padding-bottom: 1rem;

  /* Masquer la scrollbar */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Slide = styled.img`
  flex: 0 0 auto;
  width: 250px;
  height: 200px;
  object-fit: cover;
  border-radius: 6px;
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
  ${(props) => (props.left ? "left: 0.5rem;" : "right: 0.5rem;")}

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

export default function ImageCarousel({ images }) {
  const slidesRef = useRef();

  const scrollLeft = () => {
    slidesRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    slidesRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <CarouselWrapper>
      <ArrowButton left onClick={scrollLeft}>
        <ChevronLeft size={24} />
      </ArrowButton>
      <Slides ref={slidesRef}>
        {images.map((src, i) => (
          <Slide src={src} key={i} alt={`Slide ${i + 1}`} draggable={false} />
        ))}
      </Slides>
      <ArrowButton onClick={scrollRight}>
        <ChevronRight size={24} />
      </ArrowButton>
    </CarouselWrapper>
  );
}
