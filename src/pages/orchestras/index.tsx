import Head from 'next/head';
import HomeCards from '../../frontend/components/HomeCards';
import styled from 'styled-components';
import axios from 'axios';
import Footer from '../../frontend/components/Footer';
import { useEffect, useState } from 'react';
import OrchestasNavBar from '../../frontend/components/OrchestasNavBar';
import { prisma } from '../../../lib/prisma';
import { useRouter } from 'next/router';

const StyledMain = styled.main`
	margin: 25px auto;
	width: 100%;
	max-width: 1440px;
	display: grid;
	grid-template-columns: repeat(16, minmax(0, 1fr));
	gap: 24px;
	padding: 0 80px;

	.content {
		grid-column: 1/17;

		.nav-btn {
			padding: 12px;
			font-size: 12px;
			border: 1px solid lightgray;
			border-radius: 12px;
			font-weight: bold;
			background-color: white;
			margin: 12px;

			:hover {
				cursor: pointer;
				background-color: ${({ theme }) => theme.colors.secondary};
				color: white;
				&:disabled {
					cursor: unset;
					color: lightgray;
					background-color: white;
				}
			}

			:disabled {
				cursor: unset;
				color: lightgray;
			}
		}

		.filters-container {
			margin: 24px 0;
			display: flex;
			justify-content: end;
			gap: 15px;

			.dropbtn,
			.reset-btn {
				padding: 8px 12px;
				font-size: 12px;
				border: none;
				border-radius: 6px;
				font-weight: 300;
				z-index: 2;
				position: relative;
				width: 140px;
			}

			.reset-btn {
				:hover {
					cursor: pointer;
					background-color: ${({ theme }) => theme.colors.secondary};
					color: white;
				}
			}

			.dropdown {
				position: relative;
				display: inline-block;
			}

			.dropdown-content {
				display: none;
				position: absolute;
				min-width: 150px;
				box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
				z-index: 1;
				font-size: 0.8em;
				border-radius: 8px;
				border: 1px solid lightgray;
				background-color: white;
				padding-top: 34px;
				margin-top: -35px;
				margin-left: -5px;
			}

			.dropdown-content a {
				color: black;
				padding: 12px 16px;
				text-decoration: none;
				display: block;
				background-color: white;
			}

			/* Change color of dropdown links on hover */
			.dropdown-content a:hover {
				background-color: #f1f2f6;
				cursor: pointer;
			}

			/* Show the dropdown menu on hover */
			.dropdown:hover .dropdown-content {
				display: block;
			}

			/* Change the background color of the dropdown button when the dropdown content is shown */
			.dropdown:hover .dropbtn {
				background-color: ${({ theme }) => theme.colors.secondary};
				color: white;
			}
		}

		.orquestas {
			width: 100%;
			display: grid;
			grid-template-columns: repeat(4, minmax(0, 1fr));
			gap: 24px;

			.search-alert,
			.loading-msg {
				grid-column: 1/5;
				margin: 242px auto;
				font-size: 2em;
			}
		}

		.paginacion {
			margin: 15px 0;
			display: flex;
			justify-content: center;
		}
	}
`;

export default function Orquestas({ orchestraTypes }: any) {
	const [orchestras, setOrchestras] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);
	const [search, setSearch] = useState('');
	const [loading, setLoading] = useState(true);
	const itemsPerPage = 4;
	const router = useRouter();
	const searchQuery = router.asPath.split('?').pop();

	useEffect(() => {
		setLoading(true);
		axios
			.get(`api/orchestra?${searchQuery}`)
			.then((res) => setOrchestras(res.data))
			.finally(() => setLoading(false));
	}, [searchQuery]);

	const { data = [], results = 1 }: any = orchestras;
	let pages = Math.ceil(results / itemsPerPage);

	const nextPage = () => {
		if (currentPage < pages - 1) {
			router.push(
				{
					pathname: '/orchestras',
					query: { ...router.query, page: currentPage + 1 },
				},
				undefined,
				{}
			);
			setCurrentPage(currentPage + 1);
		}
	};

	const prevPage = () => {
		if (currentPage > 0) {
			router.push(
				{
					pathname: '/orchestras',
					query: { ...router.query, page: currentPage - 1 },
				},
				undefined,
				{}
			);
			setCurrentPage(currentPage - 1);
		}
	};

	function nameSortDesc() {
		router.push(
			{
				pathname: '/orchestras',
				query: { ...router.query, order: 'desc', page: 0 },
			},
			undefined,
			{}
		);
		setCurrentPage(0);
	}

	function nameSortAsc() {
		router.push(
			{
				pathname: '/orchestras',
				query: { ...router.query, order: 'asc', page: 0 },
			},
			undefined,
			{}
		);
		setCurrentPage(0);
	}

	function typeFilterHandler(id: string) {
		router.push(
			{
				pathname: '/orchestras',
				query: { ...router.query, orchestra_TypeId: id, page: 0 },
			},
			undefined,
			{}
		);
		setCurrentPage(0);
	}

	function resetHandler() {
		router.push(
			{
				pathname: '/orchestras',
			},
			undefined,
			{}
		);
		setCurrentPage(0);
	}

	return (
		<>
			<Head>
				<title>Listado de Orquestas Populares de Música Latinoamericana</title>
			</Head>
			<OrchestasNavBar
				search={search}
				setSearch={setSearch}
				router={router}
				setCurrentPage={setCurrentPage}
			/>
			<StyledMain>
				<section className='content'>
					<div className='filters-container'>
						<div className='dropdown'>
							<button className='dropbtn'>Tipo de Orquesta</button>
							<div className='dropdown-content'>
								{orchestraTypes.map((orchestraType: any) => {
									const { id, type } = orchestraType;
									return (
										<a
											className='filter-option'
											key={id}
											onClick={() => typeFilterHandler(id)}
										>
											{type}
										</a>
									);
								})}
							</div>
						</div>
						<div className='dropdown'>
							<button className='dropbtn'>Ordernar por:</button>
							<div className='dropdown-content'>
								<a className='filter-option' onClick={nameSortAsc}>
									Nombre Asc
								</a>
								<a className='filter-option' onClick={nameSortDesc}>
									Nombre Desc
								</a>
							</div>
						</div>
						<div className='dropdown'>
							<button className='reset-btn' onClick={resetHandler}>
								Restablecer
							</button>
						</div>
					</div>
					<div className='orquestas'>
						{loading ? (
							<p className='loading-msg'>Loading...</p>
						) : data.length > 0 ? (
							data.map((orquesta: any, index: number) => (
								<HomeCards
									key={orquesta.id}
									id={orquesta.id}
									title={orquesta.name}
									subtitle={orquesta.location}
									content={orquesta.description.substr(0, 150)}
									image={orquesta.logo}
								/>
							))
						) : (
							<p className='search-alert'>Sin coincidencias</p>
						)}
					</div>
					<div className='paginacion'>
						<button
							className='nav-btn'
							onClick={prevPage}
							disabled={currentPage === 0}
						>
							Anterior
						</button>
						<button
							className='nav-btn'
							onClick={nextPage}
							disabled={currentPage >= pages - 1}
						>
							Siguiente
						</button>
					</div>
				</section>
			</StyledMain>
			<Footer />
		</>
	);
}

export async function getServerSideProps() {
	const orchestraTypes = await prisma.orchestra_type.findMany();
	return {
		props: { orchestraTypes },
	};
}
