import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowRight, Palette, Calendar, FileText } from 'lucide-react';

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
  return (
    <HomeContainer className="fade-in">
      <HeroSection>
        <HeroContent>
          <HeroTitle>Masterful Artistry</HeroTitle>
          <HeroSubtitle>
            Discover the profound world of contemporary painting through the eyes of a master artist. 
            Each brushstroke tells a story, each canvas holds a universe of emotion and meaning.
          </HeroSubtitle>
          <CTAButton to="/gallery">
            Explore Gallery <ArrowRight size={20} />
          </CTAButton>
        </HeroContent>
      </HeroSection>

      <AboutSection>
        <AboutContent>
          <AboutText>
            <h2>About the Artist</h2>
            <p>
              With over two decades of artistic exploration, our featured painter has developed a distinctive 
              voice that bridges classical techniques with contemporary vision. Each work emerges from a deep 
              understanding of color, form, and the human experience.
            </p>
            <p>
              Born from a passion for capturing the essence of life through paint, these artworks invite 
              viewers into a dialogue about beauty, meaning, and the complexity of our shared existence. 
              The artist's journey continues to evolve, always pushing boundaries while honoring the 
              timeless craft of painting.
            </p>
            <p>
              From intimate portraits to sweeping landscapes, each piece represents a moment of artistic 
              discovery, a conversation between the artist's vision and the canvas that becomes a window 
              into new worlds of possibility.
            </p>
          </AboutText>
          <PlaceholderImage>
            Artist Photo Placeholder
          </PlaceholderImage>
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
