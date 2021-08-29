// imports from react packages
import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Custom imports
import useAuthentication from './efftects/authentication';
import SquadContainer from './containers/squad';
import LeaguesContainer from './containers/leagues';
import TeamsDisplayContainer from './containers/teamsDisplay';
import App from './containers/app';
import SignIn from './components/Accounts/Signin';
import sessionUtils from './utils/session';
import { fetchUserState } from './actions/authAction';

//Layout
import MainLayout from './components/Layouts/MainLayout';

// Application's public routes
const AppRoute = ({ path, Component, exact, isAuthenticated, Layout }) => {
	return (
		<Route
			path={path}
			exact={exact}
			render={(props) => (
				<Layout {...props} isAuthenticated={isAuthenticated}>
					<Component {...props} />
				</Layout>
			)}
		/>
	);
};

// Application's authentication based routes
const AuthRoute = ({
	path,
	Component,
	exact,
	isAuthenticated,
	Layout,
	name,
}) => {
	return (
		<Route
			path={path}
			exact={exact}
			render={(props) =>
				!isAuthenticated ? (
					<Redirect to='/'></Redirect>
				) : (
					<Layout {...props} isAuthenticated={isAuthenticated} name={name}>
						<Component {...props} />
					</Layout>
				)
			}
		/>
	);
};

const Routes = ({ history }) => {
	const dispatch = useDispatch();
	const hasSession = !!sessionUtils.getSessionLocalStorage();
	const isAuthenticated = useAuthentication(history);

	useEffect(() => {
		if (hasSession) {
			dispatch(fetchUserState());
		}
	}, []);

	return (
		// Routes configured
		<>
			<Switch>
				<AuthRoute
					path='/Squad'
					exact={true}
					Component={SquadContainer}
					isAuthenticated={isAuthenticated || hasSession}
					Layout={MainLayout}
					name='Squad'></AuthRoute>
				<AuthRoute
					path='/Team'
					exact={true}
					Component={TeamsDisplayContainer}
					isAuthenticated={isAuthenticated || hasSession}
					Layout={MainLayout}
					name='Team'></AuthRoute>
				<AuthRoute
					path='/Leagues'
					exact={true}
					Component={LeaguesContainer}
					isAuthenticated={isAuthenticated || hasSession}
					Layout={MainLayout}
					name='Leagues'></AuthRoute>
				<AppRoute
					path='/Home'
					exact={true}
					Component={App}
					isAuthenticated={isAuthenticated || hasSession}
					Layout={MainLayout}></AppRoute>
				<AppRoute
					path='/Signin'
					exact={true}
					Component={SignIn}
					isAuthenticated={isAuthenticated || hasSession}
					Layout={MainLayout}></AppRoute>
				<Redirect to='/Home' from='/' />
			</Switch>
		</>
	);
};

export default Routes;
