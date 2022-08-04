import { Html, Head, Main, NextScript } from 'next/document';

import Favicon from '../components/UI/favicon/favicon';

const Document = () => {
	return (
		<Html lang="en">
			<Head>
				<Favicon />
				<link rel="manifest" href="/site.webmanifest" />
				<link
					href="https://fonts.googleapis.com/css2?family=Berkshire+Swash&family=Poppins:wght@300;400;700&display=swap"
					rel="stylesheet"
				/>
				<link
					rel="stylesheet"
					href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
					integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ=="
					crossOrigin=""
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
};

export default Document;
