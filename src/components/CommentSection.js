// src/components/CommentSection.js
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getComments, submitComment } from "../sanity/queries";

const Container = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #333;
`;

const CommentList = styled.div`
  margin-bottom: 2rem;
`;

const Comment = styled.div`
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;

  p {
    margin: 0;
    color: #ccc;
  }

  span {
    display: block;
    margin-top: 0.5rem;
    font-size: 0.8rem;
    color: #777;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  input,
  textarea {
    padding: 0.75rem;
    border: 1px solid #555;
    border-radius: 4px;
    background: #0a0a0a;
    color: #fff;
    font-size: 1rem;
  }

  button {
    padding: 0.75rem;
    background: #fff;
    color: #0a0a0a;
    border: none;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
      background: #ddd;
    }
  }
`;

export default function CommentSection({ contentId, contentType }) {
  const [comments, setComments] = useState([]);
  const [author, setAuthor] = useState("");
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchComments = async () => {
    const data = await getComments(contentId, contentType);
    setComments(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, [contentId, contentType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await submitComment({
        author,
        comment: commentText,
        contentId,
        contentType,
      });
      setAuthor("");
      setCommentText("");
      // Recharge immédiatement les commentaires
      fetchComments();
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <h3>Commentaires</h3>

      {loading ? (
        <p>Chargement des commentaires...</p>
      ) : comments.length === 0 ? (
        <p>Aucun commentaire pour le moment.</p>
      ) : (
        <CommentList>
          {comments.map((c) => (
            <Comment key={c._id}>
              <p>{c.comment}</p>
              <span>
                Par {c.author} –{" "}
                {new Date(c.createdAt).toLocaleDateString("fr-FR")}
              </span>
            </Comment>
          ))}
        </CommentList>
      )}

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Votre nom"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <textarea
          placeholder="Votre commentaire"
          rows="4"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          required
        />
        <button type="submit" disabled={submitting}>
          {submitting ? "Envoi..." : "Envoyer le commentaire"}
        </button>
      </Form>
    </Container>
  );
}
