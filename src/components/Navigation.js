import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Menu, X } from "lucide-react";
import { getArtistInfo } from "../sanity/queries";

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #333;
  z-index: 1000;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffffff;
  text-decoration: none;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: #cccccc;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
  position: relative;

  &:hover {
    color: #ffffff;
  }

  ${(props) =>
    props.$isActive &&
    `
    color: #ffffff;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      right: 0;
      height: 2px;
      background-color: #ffffff;
    }
  `}
`;

const MobileMenuButton = styled.button`
  display: none;
  color: #ffffff;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  display: none;
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  background-color: rgba(10, 10, 10, 0.98);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #333;
  padding: 2rem;

  @media (max-width: 768px) {
    display: ${(props) => (props.$isOpen ? "block" : "none")};
  }
  z-index: 9999;
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const MobileNavLink = styled(Link)`
  color: #cccccc;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
  transition: color 0.2s ease;

  &:hover {
    color: #ffffff;
  }

  ${(props) =>
    props.$isActive &&
    `
    color: #ffffff;
  `}
`;

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [artistName, setArtistName] = useState("Artist Portfolio");
  const location = useLocation();
  const isHome = location.pathname === "/" || location.pathname === "/accueil";
  useEffect(() => {
    const fetchArtistName = async () => {
      try {
        const info = await getArtistInfo();
        if (info && info.name) {
          setArtistName(info.name);
        }
      } catch (error) {
        console.error("Error fetching artist name:", error);
      }
    };

    fetchArtistName();
  }, []);

  const navItems = [
    { path: "/Galerie", label: "Galerie" },
    { path: "/expositions", label: "Expositions" },
    { path: "/manifeste", label: "A propos" },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <Nav>
        <NavContainer>
          <Logo to="/">
            {!isHome && (
              <Link to="/" className="nav-link">
                {artistName}
              </Link>
            )}
          </Logo>

          <NavLinks>
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                $isActive={location.pathname === item.path}
              >
                {item.label}
              </NavLink>
            ))}
          </NavLinks>

          <MobileMenuButton onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </MobileMenuButton>
        </NavContainer>
      </Nav>

      <MobileMenu $isOpen={mobileMenuOpen}>
        <MobileNavLinks>
          {navItems.map((item) => (
            <MobileNavLink
              key={item.path}
              to={item.path}
              $isActive={location.pathname === item.path}
              onClick={closeMobileMenu}
            >
              {item.label}
            </MobileNavLink>
          ))}
        </MobileNavLinks>
      </MobileMenu>
    </>
  );
};

export default Navigation;
