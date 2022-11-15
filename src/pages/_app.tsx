import type { AppProps } from "next/app";
import { ThemeProvider, DefaultTheme } from "styled-components";
import GlobalStyle from "../frontend/styles/globalstyles";
import { SessionProvider } from 'next-auth/react'
const theme: DefaultTheme = {
  colors: {
    primary: "#111827",
    secondary: "#862866",
  },
};

export default function App({ Component, pageProps, }: AppProps) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
      </SessionProvider>
    </>
  );
}
