// src/pages/Papazoff.js
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getPapazoffInfo } from "../sanity/queries";

const Container = styled.div`
  min-height: calc(100vh - 80px);
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Section = styled.section`
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  margin-bottom: 2rem;
  color: #ffffff;
  text-align: center;
`;

const ConferenceCard = styled.div`
  background: #1a1a1a;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  border: 1px solid #333;
`;

const FileLink = styled.a`
  display: inline-block;
  margin: 0.5rem 0;
  color: #cccccc;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #ffffff;
  }
`;

const VideoWrapper = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  border-radius: 8px;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
`;

export default function Papazoff() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const result = await getPapazoffInfo();
      setData(result);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <Container>
        <SectionTitle>Chargement...</SectionTitle>
      </Container>
    );
  }

  if (!data) {
    return (
      <Container>
        <SectionTitle>Aucune information trouvée.</SectionTitle>
      </Container>
    );
  }

  return (
    <Container className="fade-in">
      {/* Conférences */}
      {data.conferences && data.conferences.length > 0 && (
        <Section>
          <SectionTitle>Conférences</SectionTitle>
          {data.conferences.map((conf, idx) => (
            <ConferenceCard key={idx}>
              <h3>{conf.title}</h3>
              <p>
                {conf.date &&
                  new Date(conf.date).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                {conf.location && ` • ${conf.location}`}
              </p>
              <p>{conf.description}</p>
            </ConferenceCard>
          ))}
        </Section>
      )}

      {/* Dossier d'expositions */}
      {data.dossierExpos && data.dossierExpos.length > 0 && (
        <Section>
          <SectionTitle>Dossier d’Expositions</SectionTitle>
          {data.dossierExpos.map((doc, idx) => (
            <FileLink
              key={idx}
              href={doc.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              📄 {doc.title}
            </FileLink>
          ))}
        </Section>
      )}

      {/* Press Book */}
      {data.pressBookFormats && data.pressBookFormats.length > 0 && (
        <Section>
          <SectionTitle>Press Book</SectionTitle>
          {data.pressBookFormats.map((doc, idx) => (
            <FileLink
              key={idx}
              href={doc.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              📄 {doc.format}
            </FileLink>
          ))}
        </Section>
      )}

      {/* Film */}
      {data.film?.videoUrl && (
        <Section>
          <SectionTitle>{data.film.title || "Film"}</SectionTitle>
          <VideoWrapper>
            <iframe
              src={data.film.videoUrl}
              title={data.film.title}
              allowFullScreen
            />
          </VideoWrapper>
        </Section>
      )}
    </Container>
  );
}
