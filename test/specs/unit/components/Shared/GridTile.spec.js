import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { afterEach } from '@jest/globals';
import '@testing-library/jest-dom';

import GridTile from '../../../../../src/components/Shared/GridTile';
import JSON from '../../../../libs/utils/json-utils';

afterEach(cleanup);

describe('Grid tile component UI test suit', () => {
	it('Validate GridTile elements having classes with name accordian', () => {
		const { container } = render(<GridTile {...JSON.GRID_OBJ_DATA}></GridTile>);
		expect(container.getElementsByClassName('accordion').length).toBe(1);
	});
	it('Validate GridTile elements having ul as first child', () => {
		const { container } = render(<GridTile {...JSON.GRID_OBJ_DATA}></GridTile>);
		expect(container.getElementsByTagName('ul').length).toEqual(1);
	});
	it('Validate GridTile elements having ul > li > button', () => {
		const { container } = render(<GridTile {...JSON.GRID_OBJ_DATA}></GridTile>);
		expect(container.getElementsByTagName('button').length).toBe(1);
	});
});
