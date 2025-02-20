/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./common/**/*.{js,ts,jsx,tsx}',
		'./contexts/**/*.{js,ts,jsx,tsx}',
		'./hooks/**/*.{js,ts,jsx,tsx}',
		'./utils/**/*.{js,ts,jsx,tsx}',
		'./types/**/*.{js,ts,jsx,tsx}',
		'./primitives/**/*.{js,ts,jsx,tsx}',
		'./icons/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		colors: {
			border: "hsl(var(--border))",
			input: "hsl(var(--input))",
			ring: "hsl(var(--ring))",
			background: "hsl(var(--background))",
			foreground: "hsl(var(--foreground))",
			primary: {
				DEFAULT: "hsl(var(--primary))",
				foreground: "hsl(var(--primary-foreground))",
			},
			secondary: {
				DEFAULT: "hsl(var(--secondary))",
				foreground: "hsl(var(--secondary-foreground))",
			},
			destructive: {
				DEFAULT: "hsl(var(--destructive))",
				foreground: "hsl(var(--destructive-foreground))",
			},
			muted: {
				DEFAULT: "hsl(var(--muted))",
				foreground: "hsl(var(--muted-foreground))",
			},
			accent: {
				DEFAULT: "hsl(var(--accent))",
				foreground: "hsl(var(--accent-foreground))",
			},
			popover: {
				DEFAULT: "hsl(var(--popover))",
				foreground: "hsl(var(--popover-foreground))",
			},
			card: {
				DEFAULT: "hsl(var(--card))",
				foreground: "hsl(var(--card-foreground))",
			},
			black: 'hsl(0, 0%, 0%)',
			white: 'rgb(255, 255, 255)',
			transparent: 'transparent',
			inherit: 'inherit',
			neutral: {
				0: '#FFFFFF',
				100: '#F9F9F9',
				200: '#F7F7F7',
				300: '#F3F3F3',
				400: '#DCDDDD',
				500: '#ADB1BD',
				600: '#ADB1BD',
				700: '#474F59',
				800: '#272B30',
				900: '#060B11'
			},
			grey: {
				0: '#FFFFFF',
				100: '#F2F9FF',
				200: '#E3F2FE',
				300: '#9ED3FB',
				400: '#85C6F7',
				500: '#6FB5F9',
				600: '#339BFF',
				700: '#8AA9C1',
				800: '#2A5A7E',
				900: '#09121A'
			},
			red: '#D42600',
			green: '#0C9000',
			custom: {
				'dark-green': '#0F1A1F',
				'mint': '#50D2C1',
				'black': '#04060C',
				'white': '#F6FEFD',
				'grey': '#949E9C',
				'light-grey': '#3B4241',
				'dark-grey': '#222428',
			},
		},
		extend: {
			fontFamily: {
				sans: ['var(--rubik-font)', 'Rubik', 'Roboto', ...defaultTheme.fontFamily.sans],
				mono: ['var(--scp-font)', 'Source Code Pro', ...defaultTheme.fontFamily.mono]
			},
			screens: {
				xl: '1440px'
			},
			height: {
				content: '656px',
				app: 'calc(100dvh - 80px)',
				108: '432px'
			},
			minHeight: {
				content: '656px',
				app: 'calc(100dvh - 80px)'
			},
			width: {
				inherit: 'inherit',
				sidebar: '280px',
				main: '1000px',
				22: '88px',
				108: '432px',
				123: '492px'
			},
			maxWidth: {
				'4xl': '888px',
				'5xl': '992px',
				'6xl': '1200px',
				22: '88px',
				108: '432px',
				123: '492px'
			},
			fontSize: {
				xxs: ['10px', '16px'],
				xs: ['12px', '16px'],
				sm: ['14px', '20px'],
				base: ['16px', '24px'],
				intermediate: ['18px', '24px'],
				lg: ['20px', '32px'],
				xl: ['24px', '32px'],
				'3xl': ['32px', '40px'],
				'4xl': ['40px', '48px']
			},
			gridTemplateColumns: {
				root: 'repeat(30, minmax(0, 1fr))'
			},
			gridColumn: {
				sidebar: 'span 7 / span 7',
				main: 'span 23 / span 23'
			},
			borderRadius: {
				'4xl': '40px',
				'5xl': '48px',
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			}
		},
		plugins: [
			require('@tailwindcss/forms'),
			require('@tailwindcss/typography'),
			require('tailwindcss-animate'),
			plugin(function ({addUtilities}) {
				addUtilities({
					'.scrollbar-none': {
						'-ms-overflow-style': 'none',
						'scrollbar-width': 'none',
						'&::-webkit-scrollbar': {
							display: 'none'
						}
					}
				});
			})
		]
	}
};
