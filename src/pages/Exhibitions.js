import React from 'react';
import styled from 'styled-components';

const ExhibitionsContainer = styled.div`
  min-height: calc(100vh - 80px);
  padding: 2rem 0;
`;

const ExhibitionsHeader = styled.h2`
  text-align: center;
  margin-bottom: 3rem;
`;

const Exhibitions = () => {
  return (
    <ExhibitionsContainer className="fade-in">
      <ExhibitionsHeader>Exhibitions</ExhibitionsHeader>
      {/* Placeholder for exhibitions list */}
    </ExhibitionsContainer>
  );
};

export default Exhibitions;

