import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
text-align: right;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
      
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;

    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #0a0a0a;
    color: #ffffff;
    line-height: 1.6;
  }

  html {
    scroll-behavior: smooth;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
  }

  input, textarea {
    font-family: inherit;
    background-color: #1a1a1a;
    border: 1px solid #333;
    border-radius: 8px;
    color: #ffffff;
    padding: 12px;
    outline: none;
    transition: border-color 0.2s ease;

    &:focus {
      border-color: #666;
    }

    &::placeholder {
      color: #888;
    }
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #1a1a1a;
  }

  ::-webkit-scrollbar-thumb {
    background: #333;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  /* Loading animation */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .fade-in {
    animation: fadeIn 0.6s ease-out;
  }

  /* Responsive typography */
  h1 {
    font-size: clamp(2rem, 4vw, 3.5rem);
    font-weight: 300;
    line-height: 1.2;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: clamp(1.5rem, 3vw, 2.5rem);
    font-weight: 300;
    line-height: 1.3;
    margin-bottom: 0.8rem;
  }

  h3 {
    font-size: clamp(1.2rem, 2.5vw, 1.8rem);
    font-weight: 400;
    line-height: 1.4;
    margin-bottom: 0.6rem;
  }

  p {
      text-align: right;
    font-size: clamp(1rem, 1.5vw, 1.1rem);
    line-height: 1.6;
    margin-bottom: 1rem;
    color: #cccccc;
    white-space: pre-line;
  }

  /* Responsive grid utilities */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;

    @media (max-width: 768px) {
      padding: 0 1rem;
    }
  }

  .section {
    padding: 4rem 0;

    @media (max-width: 768px) {
      padding: 2rem 0;
    }
  }

  /* Button styles */
  .btn {
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 0.95rem;
  }

  .btn-primary {
    background-color: #ffffff;
    color: #0a0a0a;

    &:hover {
      background-color: #f0f0f0;
      transform: translateY(-1px);
    }
  }

  .btn-secondary {
    background-color: transparent;
    color: #ffffff;
    border: 1px solid #333;

    &:hover {
      border-color: #666;
      background-color: #1a1a1a;
    }
  }

  /* Card styles */
  .card {
    background-color: #1a1a1a;
    border-radius: 12px;
    padding: 2rem;
    border: 1px solid #333;
    transition: border-color 0.2s ease;

    &:hover {
      border-color: #555;
    }
  }


`;

export default GlobalStyle;
