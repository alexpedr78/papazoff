// src/components/ImageModal.js
import React from "react";
import styled from "styled-components";
import { X } from "lucide-react";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  max-width: 90vw;
  max-height: 90vh;
  border-radius: 4px;
`;

const CloseButton = styled.button`
  position: fixed;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: white;
  z-index: 1001;
  cursor: pointer;
`;

export default function ImageModal({ src, alt, onClose }) {
  const handleClickOutside = (e) => {
    if (e.target.id === "overlay") onClose();
  };

  return (
    <Overlay id="overlay" onClick={handleClickOutside}>
      <CloseButton onClick={onClose}>
        <X size={32} />
      </CloseButton>
      <Image src={src} alt={alt} />
    </Overlay>
  );
}
