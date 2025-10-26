// src/pages/Contact.js
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getContactInfo } from "../sanity/queries";

const Container = styled.div`
  max-width: 1000px;
  margin: auto;
  padding: 3rem 1rem;
  color: #fff;
`;

const Card = styled.div`
  background: #111;
  border: 1px solid #222;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 280px;
  object-fit: cover;
  display: block;
`;

const CardContent = styled.div`
  padding: 1.5rem;

  h1,
  h2 {
    margin-bottom: 1rem;
    color: #fff;
  }

  p {
    font-size: 1rem;
    line-height: 1.6;
    color: #ccc;
    margin-bottom: 1rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;

  a {
    color: #87cefa;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s ease;

    &:hover {
      color: #fff;
      text-decoration: underline;
    }
  }
`;

export default function Contact() {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    getContactInfo().then(setContact);
  }, []);

  if (!contact) return <Container>Chargement…</Container>;

  return (
    <Container className="fade-in">
      <Card>
        <CardContent>
          {contact.detailImageUrl && (
            <Card>
              <CardImage src={contact.detailImageUrl} alt="Détail" />
            </Card>
          )}
          <h1>Contact</h1>
          {contact.text && <p>{contact.text}</p>}
          {contact.email && (
            <p>
              📧 <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </p>
          )}

          {contact.socialLinks?.length > 0 && (
            <SocialLinks>
              {contact.socialLinks.map((s, i) => (
                <a
                  key={i}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.platform}
                </a>
              ))}
            </SocialLinks>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
