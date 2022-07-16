import Link from 'next/link';

import style from './footer.module.scss';

const Footer = () => {
	const thisYear = new Date().getFullYear();

	return (
		<footer className={style['footer']}>
			<p className={style['copy']}>
				Copyright {thisYear} &copy;{' '}
				<Link href="https://github.com/karelfh" target="_blank">
					<a className={style['copy-link']}>Karel-František Houf</a>
				</Link>
			</p>
		</footer>
	);
};

export default Footer;
