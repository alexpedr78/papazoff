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
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/exhibitions" element={<Exhibitions />} />
            <Route path="/expositions/:title" element={<ExhibitionDetail />} />
            <Route path="/papazoff" element={<Papazoff />} />
            <Route path="/series" element={<Series />} />
            <Route path="/atelier" element={<Atelier />} />
            <Route path="/chez-les-gens" element={<ChezLesGens />} />
          </Routes>
        </MainContent>
      </AppContainer>
    </Router>
  );
}

export default App;
