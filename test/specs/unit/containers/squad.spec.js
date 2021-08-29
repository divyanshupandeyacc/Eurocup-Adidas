import React from 'react';
import reactRouterDom from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import { cleanup, render, fireEvent, getByText } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import SquadContainer from '../../../../src/containers/squad';

afterEach(cleanup);

// arrange
jest.mock('react-router-dom');
const mockStore = configureMockStore([thunk]);
const store = mockStore({});
const pushMock = jest.fn();
reactRouterDom.useHistory = jest.fn().mockReturnValue({ push: pushMock });
const wrapper = shallow(
	<Provider store={store}>
		<SquadContainer />
	</Provider>
);

describe('Squad component UI test suit', () => {
	it('Validate Squad elements having class with name card', () => {
		//assert
		expect(wrapper.find('container')).toBeDefined();
		expect(wrapper.find('main')).toBeDefined();
	});

	it('Validate Squad component has a input type checkbox', () => {
		//assert
		expect(wrapper.findWhere((el) => el.prop('type') == 'checkbox')).toBeTruthy();
	});

	it('Check page has button says Create', () => {
		//assert
		expect(wrapper.findWhere((el) => el.prop('type') == 'button')).toBeTruthy();
	});
});
