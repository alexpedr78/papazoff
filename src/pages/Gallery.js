import React from 'react';
import styled from 'styled-components';
// import PaintingList from '../components/PaintingList';

const GalleryContainer = styled.div`
  min-height: calc(100vh - 80px);
  padding: 2rem 0;
`;

const GalleryHeader = styled.h2`
  text-align: center;
  margin-bottom: 3rem;
`;

const Gallery = () => {
  return (
    <GalleryContainer className="fade-in">
      <GalleryHeader>Gallery</GalleryHeader>
      {/* Placeholder for painting list */}
      {/* <PaintingList /> */}
    </GalleryContainer>
  );
};

export default Gallery;
