import "tailwindcss/tailwind.css";
import { ContextProvider } from "../utils/context";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
}
body { 
    background: rgb(229, 231, 235) !important;
    min-width: 350px;
}


`;

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <GlobalStyle />
      <Component {...pageProps} />{" "}
    </ContextProvider>
  );
}

export default MyApp;
