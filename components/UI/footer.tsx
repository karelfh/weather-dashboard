import Link from 'next/link';

const Footer = () => {
	const thisYear = new Date().getFullYear();

	return (
		<footer>
			Copyright {thisYear} &copy;{' '}
			<Link href="https://github.com/karelfh">Karel-František Houf</Link>
		</footer>
	);
};

export default Footer;
