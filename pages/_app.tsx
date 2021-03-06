import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Shortl - Shorten Links/URLs</title>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link rel="manifest" href="/site.webmanifest" />
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
				<meta name="apple-mobile-web-app-title" content="Shortl" />
				<meta name="application-name" content="Shortl" />
				<meta name="msapplication-TileColor" content="#603cba" />
				<meta name="theme-color" content="#ffffff" />
				<meta
					name="description"
					content="Shorten Your Long URLs or Links with your own custom slug or keyword."
				/>
			</Head>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
