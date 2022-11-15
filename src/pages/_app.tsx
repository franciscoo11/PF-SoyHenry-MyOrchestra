import type { AppProps } from "next/app";
import { ThemeProvider, DefaultTheme } from "styled-components";
import { UserProvider } from '@auth0/nextjs-auth0'
import GlobalStyle from "../frontend/styles/globalstyles";

const theme: DefaultTheme = {
  colors: {
    primary: "#111827",
    secondary: "#862866",
  },
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <UserProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
      </UserProvider>
    </>
  );
}
