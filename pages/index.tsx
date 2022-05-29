import type { NextPage, GetServerSideProps } from 'next';

const Home: NextPage = () => {
	return (
		<div className="flex justify-center items-center h-screen">
			<h1 className="text-4xl font-bold">Weather Dashboard</h1>
		</div>
	);
};

export default Home;
