import Link from 'next/link';
import { useRouter } from 'next/router';

import style from './nav-item.module.scss';

const NavItem = ({ title, href }: { title: string; href: string }) => {
	const router = useRouter();

	const isActive = router.pathname === href ? style['active'] : '';

	return (
		<Link href={href}>
			<a className={`${style['nav-link']} ${isActive}`}>{title}</a>
		</Link>
	);
};

export default NavItem;
