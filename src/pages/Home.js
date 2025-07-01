import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowRight, Palette, Calendar, FileText } from 'lucide-react';
import { getArtistInfo } from '../sanity/queries';
import { urlFor } from '../sanity/client';
import { testConnection } from '../sanity/test-connection';

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
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #ffffff 0%, #cccccc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const HeroSubtitle = styled.p`
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  color: #999;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background-color: #ffffff;
  color: #0a0a0a;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 255, 255, 0.1);
  }
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

const FeaturesSection = styled.section`
  padding: 6rem 0;
  background-color: #0f0f0f;

  @media (max-width: 768px) {
    padding: 4rem 0;
  }
`;

const FeaturesGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled.div`
  background-color: #1a1a1a;
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid #333;
  transition: all 0.3s ease;

  &:hover {
    border-color: #555;
    transform: translateY(-4px);
  }

  .icon {
    margin-bottom: 1rem;
    color: #ffffff;
  }

  h3 {
    margin-bottom: 1rem;
    color: #ffffff;
  }

  p {
    margin-bottom: 1.5rem;
  }
`;

const FeatureLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #ffffff;
  font-weight: 500;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const Home = () => {
  const [artistInfo, setArtistInfo] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const info = await getArtistInfo()
        setArtistInfo(info)
      } catch (error) {
        console.error('Error loading artist info:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <HomeContainer className="fade-in">
        <HeroSection>
          <HeroContent>
            <p>Loading...</p>
          </HeroContent>
        </HeroSection>
      </HomeContainer>
    )
  }

  // Fallback content if no artist info is found
  const fallbackContent = {
    heroTitle: "Masterful Artistry",
    heroSubtitle: "Discover the profound world of contemporary painting through the eyes of a master artist. Each brushstroke tells a story, each canvas holds a universe of emotion and meaning.",
    shortBio: "With over two decades of artistic exploration, our featured painter has developed a distinctive voice that bridges classical techniques with contemporary vision."
  }

  const content = artistInfo || fallbackContent

  return (
    <HomeContainer className="fade-in">
      <HeroSection>
        <HeroContent>
          <HeroTitle>{content.heroTitle || fallbackContent.heroTitle}</HeroTitle>
          <HeroSubtitle>
            {content.heroSubtitle || fallbackContent.heroSubtitle}
          </HeroSubtitle>
          <CTAButton to="/gallery">
            Explore Gallery <ArrowRight size={20} />
          </CTAButton>
        </HeroContent>
      </HeroSection>

      <AboutSection>
        <AboutContent>
          <AboutText>
            <h2>About {content.name || 'the Artist'}</h2>
            <p>
              {content.shortBio || fallbackContent.shortBio}
            </p>
          </AboutText>
          {content.profileImage ? (
            <img 
              src={urlFor(content.profileImage).width(400).height(400).url()} 
              alt={content.name}
              style={{
                width: '100%',
                height: '400px',
                objectFit: 'cover',
                borderRadius: '12px'
              }}
            />
          ) : (
            <PlaceholderImage>
              Artist Photo Placeholder
            </PlaceholderImage>
          )}
        </AboutContent>
      </AboutSection>

      <FeaturesSection>
        <FeaturesGrid>
          <FeatureCard>
            <div className="icon">
              <Palette size={32} />
            </div>
            <h3>Original Artworks</h3>
            <p>
              Explore a comprehensive collection of original paintings, each with detailed information 
              about materials, dimensions, and availability.
            </p>
            <FeatureLink to="/gallery">
              View Gallery <ArrowRight size={16} />
            </FeatureLink>
          </FeatureCard>

          <FeatureCard>
            <div className="icon">
              <Calendar size={32} />
            </div>
            <h3>Exhibitions</h3>
            <p>
              Stay updated with upcoming exhibitions and revisit past shows that have showcased 
              these remarkable works to audiences worldwide.
            </p>
            <FeatureLink to="/exhibitions">
              See Exhibitions <ArrowRight size={16} />
            </FeatureLink>
          </FeatureCard>

          <FeatureCard>
            <div className="icon">
              <FileText size={32} />
            </div>
            <h3>Artist Manifesto</h3>
            <p>
              Dive deep into the artist's philosophy and vision through an exclusive 24-minute 
              documentary and written manifesto.
            </p>
            <FeatureLink to="/manifesto">
              Read Manifesto <ArrowRight size={16} />
            </FeatureLink>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>
    </HomeContainer>
  );
};

export default Home;
