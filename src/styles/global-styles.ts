import { createGlobalStyle } from "styled-components";
export const GlobalStyle = createGlobalStyle`
  :root {
    --color-primary: #007bff;
    --color-primary-hover: #0056b3;
    --color-text: #333;
    --color-error: red;
    --color-border: #ccc;
    --color-bg-form: rgba(255, 255, 255, 1);
    --color-disabled: #cccccc;

    --color-bg-dark: #242424;
    --color-bg-light: #ffffff;
  }

  body {
    margin: 0;
    font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
    color: var(--color-text);
    background-color: var(--color-bg-light);
  }

  a {
    font-weight: 500;
    color: var(--color-primary);
    text-decoration: inherit;
  }

  a:hover {
    color: var(--color-primary-hover);
  }

  button:hover {
    border-color: var(--color-primary);
  }

  @media (prefers-color-scheme: dark) {
    body {
      color: var(--color-bg-light);
      background-color: var(--color-bg-dark);
    }
  }
 
`;
