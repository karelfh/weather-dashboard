import { Children } from 'react';
import { useState, useEffect } from 'react';
import { BiMenu, BiX } from 'react-icons/bi';

import style from './navbar.module.scss';

const Navbar = ({ children }: { children: JSX.Element[] }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [windowSize, setWindowSize] = useState({
		width: 0,
		height: 0,
	});

	useEffect(() => {
		const handleResize = () => {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};
		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	// If the hamburger menu is open, close it when screen is resized to a larger sized
	useEffect(() => {
		if (windowSize.width > 768 && isOpen) {
			setIsOpen(false);
		}
	}, [windowSize.width, isOpen]);

	// When the hamburger menu is open, disable scrolling
	useEffect(() => {
		document.body.style.overflow = isOpen ? 'hidden' : 'auto';

		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [isOpen]);

	const handleToggle = () => {
		setIsOpen((prevState) => !prevState);
	};

	const hideMenu = () => setIsOpen(false);

	const navClasses = isOpen && windowSize.width < 768 ? style['menuOpen'] : '';

	return (
		<>
			<nav className={`${style['navbar']} ${navClasses}`}>
				<ul>
					{Children.map(children, (child) => (
						<li key={child.key} onClick={hideMenu}>
							{child}
						</li>
					))}
				</ul>
			</nav>
			<div className={style['toggle']}>
				{isOpen ? (
					<BiX className={style['toggle-icon']} onClick={handleToggle} />
				) : (
					<BiMenu className={style['toggle-icon']} onClick={handleToggle} />
				)}
			</div>
		</>
	);
};

export default Navbar;
