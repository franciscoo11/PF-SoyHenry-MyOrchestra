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
		width: 90%;
		gap: 24px;
		@media (max-width: 992px) {
			height: unset;
		}

		.cover-art {
			display: flex;
			justify-content: center;
			align-items: center;
			@media (max-width: 992px) {
				flex-direction: column;
				gap: 100px;
				padding: 25px 0;
			}

			.mapa {
				max-height: 440px;
				max-width: 40%;
				@media (max-width: 992px) {
					max-width: 60%;
				}
			}
			.isologo {
				max-height: 65px;
				max-width: 60%;
				margin-left: 50px;
				margin-top: -70px;
				@media (max-width: 992px) {
					margin-left: 0px;
					max-width: 95%;
				}
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
