import Navbar from '../navigation/navbar/navbar';
import NavItem from '../navigation/nav-item/nav-item';

import style from './header.module.scss';

const Header = () => {
	return (
		<header className={style['header']}>
			<div className={style['content']}>
				<h1 className={style['logo']}>WeatherWizz</h1>
				<Navbar>
					<NavItem href="/" title="Dashboard" />
					<NavItem href="/map" title="Map" />
					<NavItem href="/location" title="Location" />
					<NavItem href="/calendar" title="Calendar" />
					<NavItem href="/settings" title="Settings" />
				</Navbar>
			</div>
		</header>
	);
};

export default Header;
