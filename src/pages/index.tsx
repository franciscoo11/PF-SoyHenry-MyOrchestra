import axios from 'axios';
import Head from 'next/head';
import Footer from '../frontend/components/Footer';
import HeroImage from '../frontend/components/HeroImage';
import HomeMainContent from '../frontend/components/HomeMainContent';
import MainNavBar from '../frontend/components/MainNavBar';
import { prisma } from './../../lib/prisma';

export default function Home({ orchestras }: any) {
	return (
		<>
			<Head>
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<title>Red de Orquestas Populares de Música Latinoamericana</title>
			</Head>
			<MainNavBar />
			<HeroImage />
			<HomeMainContent orchestras={orchestras} />
			<Footer />
		</>
	);
}

export const getServerSideProps = async () => {
	try {
		const orchestras = await prisma.orchestras.findMany();

		return { props: { orchestras } };
	} catch (error) {
		console.log(error);
	}
};
