import React from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import { signOutUser } from '../../actions/authAction';

import {
	Button,
	Header,
	ContentPosition,
	HeaderBrand,
	Avatar,
	Icon,
} from 'yarn-design-system-react-components';

const HeaderComp = ({ isAuthenticated }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const userData = useSelector((state) => {
		return state;
	});
	const logOut = () => {
		dispatch(signOutUser());
		history.push('/');
	};

	return (
		<>
			<Header menuOpen={false}>
				<ContentPosition position='right'>
					<NavLink to='/'>
						<HeaderBrand logo={<Icon name='products' size='md' status='default' />}>
							Adidas - Eurocup{' '}
						</HeaderBrand>
					</NavLink>
				</ContentPosition>
				<ContentPosition position='right'>
					<Avatar className='space-m-h-2' text='DP' />
					{userData.userInfo.data ? (
						<Button behavior='button' type='default' onClick={(event) => logOut()}>
							Sign Out
						</Button>
					) : (
						<NavLink to='/signin'>
							<Button behavior='button' type='default'>
								Sign in
							</Button>
						</NavLink>
					)}
				</ContentPosition>
			</Header>
		</>
	);
};

export default HeaderComp;
