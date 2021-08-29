import React from 'react';
import reactRouterDom from 'react-router-dom';
import { shallow } from 'enzyme';
import { cleanup, render, fireEvent, getByText } from '@testing-library/react';

import { afterEach } from '@jest/globals';
import '@testing-library/jest-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import Signin from '../../../../../src/components/Accounts/Signin';

afterEach(cleanup);

jest.mock('react-router-dom');
const mockStore = configureMockStore([thunk]);
const store = mockStore({});
const pushMock = jest.fn();
reactRouterDom.useHistory = jest.fn().mockReturnValue({ push: pushMock });
const component = shallow(
	<Provider store={store}>
		<Signin />
	</Provider>
);

describe('Sign in component UI test suit', () => {
	it('Check page has input box of type text', () => {
		expect(component.findWhere((el) => el.prop('type') == 'text')).toBeTruthy();
	});

	it('Check page has input box of type password', () => {
		expect(
			component.findWhere((el) => el.prop('type') == 'password')
		).toBeTruthy();
	});

	it('Check page has sign in click element of type button', () => {
		expect(component.findWhere((el) => el.prop('type') == 'button')).toBeTruthy();
	});

	it('Validate click CTA button', () => {
		const { container } = render(
			<Provider store={store}>
				<Signin></Signin>
			</Provider>
		);

		expect(
			fireEvent(getByText(container, 'Login'), new MouseEvent('click', {}))
		).toBeTruthy();
	});
});
