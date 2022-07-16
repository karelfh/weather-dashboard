import Head from 'next/head';

import Header from '../header/header';
import Footer from '../footer/footer';

import style from './layout.module.scss';

const Layout = (props: any) => {
	return (
		<>
			<Head>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta name="description" content="Put your description here."></meta>
				<meta charSet="UTF-8"></meta>
			</Head>
			<Header />
			<main className={style['main']}>{props.children}</main>
			<Footer />
		</>
	);
};

export default Layout;
