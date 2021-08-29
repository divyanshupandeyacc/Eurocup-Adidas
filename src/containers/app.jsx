// React imports
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// App container
const App = (props) => {
	const dispatch = useDispatch();
	const userData = useSelector((state) => {
		return state;
	});

	React.useEffect(() => {}, []);

	return (
		<>
			<main className='main ad-background' data-id='home-app'>
				<div className='container ad-wrapper-container'>
					<div className='row ad-message'>
						<div className='col-mg-12 text-l-brand-color-55 text-center space-p-5'>
							Welcome to Adidas football team, <br></br> Place to create your own
							franchise.<br></br>Play with leagues.
						</div>
					</div>
					{userData.userInfo.data && (
						<div className='mock-content'>
							<div className='row space-p-5 space-m-5'>
								<div className='col-md-6 text-center'>
									<div className='ad-link space-m-auto'>
										<NavLink to='/Squad'>Squad</NavLink>
									</div>
								</div>
								<div className='col-md-6 text-center'>
									<div className='ad-link space-m-auto'>
										<NavLink to='/Leagues'>Leagues</NavLink>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</main>
		</>
	);
};

export default App;
