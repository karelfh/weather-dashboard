import type { AppProps } from 'next/app';

import Layout from '../components/UI/layout/layout';

import '../styles/global.scss';
import '../styles/icons/weather-icons.scss';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}

export default MyApp;
