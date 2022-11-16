import type { AppProps } from "next/app";
import { ThemeProvider, DefaultTheme } from "styled-components";
import { SessionProvider } from 'next-auth/react'
import GlobalStyle from "../frontend/styles/globalstyles";

const theme: DefaultTheme = {
  colors: {
    primary: "#111827",
    secondary: "#862866",
  },
};

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
    <SessionProvider session={ session }>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
    </>
  );
}
