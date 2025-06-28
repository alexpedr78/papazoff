import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Exhibitions from './pages/Exhibitions';
import Manifesto from './pages/Manifesto';
import GlobalStyle from './styles/GlobalStyle';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #0a0a0a;
  color: #ffffff;
`;

const MainContent = styled.main`
  padding-top: 80px; /* Account for fixed navigation */
`;

function App() {
  return (
    <Router>
      <GlobalStyle />
      <AppContainer>
        <Navigation />
        <MainContent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/exhibitions" element={<Exhibitions />} />
            <Route path="/manifesto" element={<Manifesto />} />
          </Routes>
        </MainContent>
      </AppContainer>
    </Router>
  );
}

export default App;
