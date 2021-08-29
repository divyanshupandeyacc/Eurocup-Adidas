import React from 'react';
import reactRouterDom from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import { cleanup, render, fireEvent, getByText } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import MainLayout from '../../../../../src/components/Layouts/MainLayout';

afterEach(cleanup);

// arrange
jest.mock('react-router-dom');
const mockStore = configureMockStore([thunk]);
const store = mockStore({});
const pushMock = jest.fn();
reactRouterDom.useHistory = jest.fn().mockReturnValue({ push: pushMock });
const wrapper = shallow(
	<Provider store={store}>
		<MainLayout />
	</Provider>
);

describe('MainLayout UI test suit', () => {
	it('Validate mainlayout has a header component', () => {
		//assert
		expect(wrapper.find('HeaderComp')).toBeDefined();
	});
});
