import { NextFont } from '@next/font/dist/types';
import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		colors: {
			primary: string;
			secondary: string;
			light: string;
			lines: string;
		};
		fonts: {
			primary: any;
		};
	}
}
