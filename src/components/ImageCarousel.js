import React, { useRef } from "react";
import styled from "styled-components";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CarouselWrapper = styled.div`
  position: relative;
  overflow: hidden;
`;

const Slides = styled.div`
  display: flex;
  justify-content: ${(props) => (props.single ? "center" : "flex-start")};
  overflow-x: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  gap: 1rem;
  padding: 1rem 0;

  /* ✅ permet le swipe tactile même si user-select est désactivé globalement */
  touch-action: pan-x;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Slide = styled.img`
  flex: 0 0 auto;
  width: 80vw;
  max-width: 300px;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  user-select: none;
  scroll-snap-align: start;

  @media (min-width: 768px) {
    height: 250px;
  }
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  ${(props) => (props.$left ? "left: 0.5rem" : "right: 0.5rem")};
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.4);
  border: none;
  padding: 0.5rem;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  z-index: 10;

  &:hover {
    background: rgba(0, 0, 0, 0.6);
  }
`;

export default function ImageCarousel({
  images,
  scrollAmount = 300,
  onImageClick,
}) {
  const slidesRef = useRef(null);
  const single = images.length === 1;

  const scroll = (offset) => {
    const slider = slidesRef.current;
    if (!slider) return;

    const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
    if (offset < 0 && slider.scrollLeft <= 0) {
      slider.scrollTo({ left: maxScrollLeft, behavior: "smooth" });
    } else if (offset > 0 && slider.scrollLeft >= maxScrollLeft) {
      slider.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      slider.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <CarouselWrapper>
      {/* flèche gauche */}
      {!single && (
        <ArrowButton $left onClick={() => scroll(-scrollAmount)}>
          <ChevronLeft size={24} />
        </ArrowButton>
      )}

      <Slides ref={slidesRef} single={single}>
        {images.map((src, i) => (
          <Slide
            key={i}
            src={src}
            alt={`Slide ${i + 1}`}
            draggable={false}
            onClick={() => onImageClick && onImageClick(src)}
          />
        ))}
      </Slides>

      {/* flèche droite */}
      {!single && (
        <ArrowButton onClick={() => scroll(scrollAmount)}>
          <ChevronRight size={24} />
        </ArrowButton>
      )}
    </CarouselWrapper>
  );
}
