import type { AppProps } from 'next/app';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import GlobalStyle from '../frontend/styles/globalstyles';
export const { HOSTNAME } = process.env;
import { UserProvider } from '@auth0/nextjs-auth0';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Lato } from '@next/font/google';

const queryClient = new QueryClient();

const lato = Lato({
	weight: ['100', '300', '400', '700', '900'],
});

// console.log(lato);

const theme: DefaultTheme = {
	colors: {
		primary: '#111827',
		secondary: '#862866',
		light: '#4B5563',
		lines: '#E5E7EB',
	},
	fonts: {
		primary: lato,
	},
};

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<UserProvider>
					<ThemeProvider theme={theme}>
						<GlobalStyle />
						<Component {...pageProps} />
					</ThemeProvider>
				</UserProvider>
			</QueryClientProvider>
		</>
	);
}
