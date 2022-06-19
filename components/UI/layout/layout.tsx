import Head from 'next/head';

import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';

const Layout = (props: any) => {
	return (
		<>
			<Head>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta name="description" content="Put your description here."></meta>
				<meta charSet="UTF-8"></meta>
			</Head>
			<Navbar />
			<main>{props.children}</main>
			<Footer />
		</>
	);
};

export default Layout;
