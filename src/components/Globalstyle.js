import { createGlobalStyle } from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }
  `;

/* font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
 * transition: all 0.50s linear;
 */
