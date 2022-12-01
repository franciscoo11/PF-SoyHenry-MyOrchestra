import Link from 'next/link';
import styled from 'styled-components';

const LogStyle = styled.header`
	.loginMobile {
		display: none;
	}

	.loginMobile img {
		border: 1px solid lightgray;
		border-radius: 50%;
		padding: 10px;
	}

	@media (max-width: 650px) {
		.loginDesktop {
			display: none;
		}
		.loginMobile {
			display: flex;
		}
	}
`;

export default function LoggedOut() {
	return (
		<LogStyle>
			<div className='loginDesktop'>
				<Link href='/api/auth/login'>Iniciar sesión</Link>
			</div>
			<div className='loginMobile'>
				<Link href='/api/auth/login'>
					<img src='/images/assets/iconuser.png' />
				</Link>
			</div>
		</LogStyle>
	);
}
