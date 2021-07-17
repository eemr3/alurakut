import { createGlobalStyle, ThemeProvider } from "styled-components";
import { AlurakutStyles } from "../src/lib/AlurakutCommons";
import { AuthProvider } from "../src/utils/contexts/AuthContext";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fab);
const GlobalStyle = createGlobalStyle`
*{
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;

}
  body {
    background: linear-gradient(180deg,#02192F .13%,#010505 88.51%);
    font-family: sans-serif;
  }

  #__next {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
  ${AlurakutStyles}
`;

const theme = {
  colors: {
    primary: "#021026",
  },
};

export default function App({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}
