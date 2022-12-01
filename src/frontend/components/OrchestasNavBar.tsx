import SearchBar from './SearchBar';
import Link from 'next/link';
import styled from 'styled-components';
import Nav from './Nav';
import Auth from './Auth';

const NavStyle = styled.header`
	width: 90%;
	max-width: 1440px;
	margin: auto;
	margin-top: 24px;
	margin-bottom: 24px;

	.nav-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		.desktopNav {
			display: flex;
			justify-content: space-between;
			align-items: baseline;
			gap: 40px;
			font-size: 16px;
			font-weight: 300;
		}
		.mobileNav {
			display: none;
			justify-content: space-between;
			align-items: center;
			gap: 40px;
		}

		.mobileNav img {
			border: 1px solid lightgray;
			border-radius: 50%;
			padding: 10px;
		}

		@media (max-width: 576px) {
			.desktopNav {
				display: none;
			}
			.mobileNav {
				display: flex;
			}
		}
		.links-container {
			display: flex;
			flex-direction: row;
			align-items: baseline;
			gap: 24px;
		}
		img {
			margin-right: 5px;
		}
		a {
			&:hover,
			:focus,
			:active {
				text-decoration: none;
				color: ${({ theme }) => theme.colors.secondary};
			}
		}
	}
`;

export default function OrchestasNavBar({
	router,
	search,
	setSearch,
	setCurrentPage,
}: any) {
	return (
		<NavStyle>
			<div className='nav-container'>
				<Nav />
				<div className='links-container'>
					<Auth />
				</div>
				<SearchBar
					search={search}
					setSearch={setSearch}
					router={router}
					setCurrentPage={setCurrentPage}
				/>
			</div>
		</NavStyle>
	);
}
