import styled from 'styled-components';

const HeroContainer = styled.div`
	width: 100%;
	background-image: url('/bg_01.jpg');
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;

	.content {
		height: 450px;
		margin: 0 auto;
		width: 100%;
		gap: 24px;

		.cover-art {
			display: flex;
			justify-content: center;
			align-items: center;

			.mapa {
				max-height: 440px;
			}
			.isologo {
				height: 65px;
				margin-left: 50px;
				margin-top: -70px;
			}
		}
	}
`;

function HeroImage() {
	return (
		<>
			<HeroContainer>
				<div className='content'>
					<div className='cover-art'>
						<img
							className='mapa'
							src='/mapa.png'
							alt='Imagen representando una mapa del continente americano formado por instrumentos musicales'
						/>
						<img
							className='isologo'
							src='/isologo.png'
							alt='Red de orquestas populares de música latinoamericana'
						/>
					</div>
				</div>
			</HeroContainer>
		</>
	);
}

export default HeroImage;
