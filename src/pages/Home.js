import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getArtistInfo } from "../sanity/queries";
import { urlFor } from "../sanity/client";

const HomeContainer = styled.div`
  min-height: calc(100vh - 80px);
`;

const HeroSection = styled.section`
  padding: 6rem 0;
  text-align: center;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);

  @media (max-width: 768px) {
    padding: 4rem 0;
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const HeroTitle = styled.h1`
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 200;
  margin-bottom: 2.5rem;
  line-height: 2;
  background: linear-gradient(135deg, #ffffff 0%, #cccccc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const HeroSubtitle = styled.p`
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  color: #999;
  margin-bottom: 2.5rem;
  line-height: 1.6;
`;

const AboutSection = styled.section`
  padding: 6rem 0;

  @media (max-width: 768px) {
    padding: 4rem 0;
  }
`;

const AboutContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const AboutText = styled.div`
  h2 {
    margin-bottom: 1.5rem;
  }

  p {
    margin-bottom: 1.5rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const PlaceholderImage = styled.div`
  height: 400px;
  background: linear-gradient(135deg, #1a1a1a 0%, #333 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 1.1rem;
  border: 1px solid #333;

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const Home = () => {
  const [artistInfo, setArtistInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const info = await getArtistInfo();
        setArtistInfo(info);
      } catch (error) {
        console.error("Error loading artist info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <HomeContainer className="fade-in">
        <HeroSection>
          <HeroContent>
            <p>Loading...</p>
          </HeroContent>
        </HeroSection>
      </HomeContainer>
    );
  }

  // Fallback content if no artist info is found
  const fallbackContent = {
    // heroTitle: "Masterful Artistry",
    // heroSubtitle:
    //   "Discover the profound world of contemporary painting through the eyes of a master artist. Each brushstroke tells a story, each canvas holds a universe of emotion and meaning.",
    // shortBio:
    //   "With over two decades of artistic exploration, our featured painter has developed a distinctive voice that bridges classical techniques with contemporary vision.",
  };

  const content = artistInfo || fallbackContent;

  return (
    <HomeContainer className="fade-in">
      <HeroSection>
        <HeroContent>
          <HeroTitle>{content.name || fallbackContent.heroTitle}</HeroTitle>
          <HeroSubtitle>
            {content.bio || fallbackContent.heroSubtitle}
          </HeroSubtitle>
        </HeroContent>
      </HeroSection>

      <AboutSection>
        <AboutContent>
          <AboutText>
            {/* <h2>{content.name || "the Artist"}</h2> */}
            <p>{content.shortBio || fallbackContent.shortBio}</p>
          </AboutText>
          {content.profileImage ? (
            <img
              src={urlFor(content.profileImage).width(400).height(400).url()}
              alt={content.name}
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />
          ) : (
            <PlaceholderImage>Artist Photo Placeholder</PlaceholderImage>
          )}
        </AboutContent>
      </AboutSection>
      {/* 
      <FeaturesSection></FeaturesSection> */}
    </HomeContainer>
  );
};

export default Home;
