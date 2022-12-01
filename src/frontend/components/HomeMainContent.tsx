import Link from 'next/link';
import styled from 'styled-components';
import HomeCards from './HomeCards';

export const StyledMain = styled.main`
	margin: 25px auto;
	width: 100%;
	max-width: 1440px;
	display: grid;
	grid-template-columns: repeat(4, minmax(0, 1fr));
	gap: 24px;
	padding: 0 80px;

	section {
		grid-column: 1/4;

		.section-title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 20px;
			font-weight: 400;
		}

		.more-btn {
			float: right;
			font-size: 0.7em;
			padding: 6px 12px;
			color: ${({ theme }) => theme.colors.secondary};
			border: 1px solid ${({ theme }) => theme.colors.secondary};
			border-radius: 6px;
			:hover {
				background-color: ${({ theme }) => theme.colors.secondary};
				color: white;
			}
		}

		.orquestas {
			width: 100%;
			display: grid;
			grid-template-columns: repeat(3, minmax(0, 1fr));
			gap: 24px;
		}
	}

	aside {
		grid-column: 4/5;
		margin-top: 64px;
		.temp-img {
			width: 100%;
		}
	}
`;

function HomeMainContent({ orchestras }: any) {
	const firstEntrys = () => {
		return orchestras.slice(0, 3);
	};

	return (
		<>
			<StyledMain>
				<section>
					<h2 className='section-title'>
						Orquestas{' '}
						<span className='btn-container'>
							<Link href={'/orchestras'} className='more-btn'>
								Ver más
							</Link>
						</span>
					</h2>
					<div className='orquestas'>
						{firstEntrys().map((orquesta: any, index: number) => (
							<HomeCards
								key={orquesta.id}
								id={orquesta.id}
								title={orquesta.name}
								subtitle={orquesta.location}
								content={orquesta.description.substr(0, 150)}
								image={orquesta.logo}
							/>
						))}
					</div>
				</section>
				<aside>
					<img
						className='temp-img'
						src='/aside_ref.png'
						alt='Campañas Solidarias'
					/>
				</aside>
			</StyledMain>
		</>
	);
}

export default HomeMainContent;
