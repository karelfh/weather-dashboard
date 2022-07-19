import Navbar from '../navigation/navbar/navbar';
import NavItem from '../navigation/nav-item/nav-item';
import Location from '../location/location';

import style from './header.module.scss';

const Header = ({ handleData }: { handleData: any }) => {
	return (
		<header className={style['header']}>
			<div className={style['content']}>
				<h1 className={style['logo']}>WeatherWizz</h1>
				<div className={style['nav-container']}>
					<Location handleData={handleData} />
					<Navbar>
						<NavItem href="/" title="Dashboard" />
						<NavItem href="/map" title="Map" />
						<NavItem href="/location" title="Location" />
						<NavItem href="/calendar" title="Calendar" />
						<NavItem href="/settings" title="Settings" />
					</Navbar>
				</div>
			</div>
		</header>
	);
};

export default Header;
