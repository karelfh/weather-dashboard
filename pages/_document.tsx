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
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
};

export default Document;
