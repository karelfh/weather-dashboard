import Link from 'next/link';

const Navbar = () => {
	return (
		<nav>
			<Link href="/">Weather Dashboard</Link>
			<div>
				<ul>
					<li>
						<Link href="/">Dashboard</Link>
					</li>
					<li>Map</li>
					<li>Locations</li>
					<li>Calendar</li>
					<li>Settings</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
