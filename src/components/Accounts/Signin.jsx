import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { TextField, Button } from 'yarn-design-system-react-components';

import { fetchUserState, signInUser } from '../../actions/authAction';

// Sign in component
const SignIn = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	// sign in CTA handle
	const signIn = () => {
		dispatch(signInUser());
		dispatch(fetchUserState());
		history && history.push('/');
	};

	React.useEffect(() => {}, []);

	return (
		<>
			<main className='main'>
				<div className='signin-container space-m-auto'>
					<div className='row mock-content space-m-auto' style={{ width: '700px' }}>
						<div className='col-md-12'>
							<form name='type-default'>
								<div className='row'>
									<div className='col-md-6 space-m-auto text-l-brand-color text-center space-p-5'>
										Welcome to Adidas<br></br>
										Sign in here !!
									</div>
									<div className='col-md-6'>
										<TextField
											active={undefined}
											disabled={undefined}
											id='username'
											label='User name'
											rows={3}
											type='text'
											value='admin'
										/>
										<TextField
											active={undefined}
											disabled={undefined}
											id='password'
											label='Password'
											rows={3}
											type='password'
											value='admin'
										/>
										<Button
											id='sign-in'
											className='float-right'
											onClick={(event) => signIn()}>
											Login
										</Button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</main>
		</>
	);
};

export default SignIn;
