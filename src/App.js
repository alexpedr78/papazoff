import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Exhibitions from "./pages/Exhibitions";
import GlobalStyle from "./styles/GlobalStyle";
import Papazoff from "./pages/Papazoff";
import Atelier from "./pages/Atelier";
import Series from "./pages/Series";
import ChezLesGens from "./pages/ChezLesGens";
import ExhibitionDetail from "./pages/ExhibitionDetail";
import SerieDetail from "./pages/SerieDetail";
const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #0a0a0a;
  color: #ffffff;
`;

const MainContent = styled.main`
  padding-top: 80px; /* Account for fixed navigation */
`;

function App() {
  useEffect(() => {
    const disableContextMenu = (e) => e.preventDefault();
    document.body.addEventListener("contextmenu", disableContextMenu);
    return () => {
      document.body.removeEventListener("contextmenu", disableContextMenu);
    };
  }, []);

  return (
    <Router>
      <GlobalStyle />
      <AppContainer>
        <Navigation />
        <MainContent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/galerie" element={<Gallery />} />
            <Route path="/expositions" element={<Exhibitions />} />
            <Route path="/expositions/:title" element={<ExhibitionDetail />} />
            <Route path="/manifeste" element={<Papazoff />} />
            <Route path="/séries" element={<Series />} />
            <Route path="/atelier" element={<Atelier />} />
            <Route path="/chez-les-gens" element={<ChezLesGens />} />

            <Route path="/séries/:title" element={<SerieDetail />} />
          </Routes>
        </MainContent>
      </AppContainer>
    </Router>
  );
}

export default App;
