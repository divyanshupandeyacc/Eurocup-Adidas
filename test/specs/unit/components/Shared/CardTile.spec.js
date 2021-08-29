import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { afterEach } from '@jest/globals';
import '@testing-library/jest-dom';

import JSON from '../../../../libs/utils/json-utils';
import CardTile from '../../../../../src/components/Shared/CardTile';

afterEach(cleanup);

describe('Card tile component UI test suit', () => {
	it('Validate CardTile elements having class with name card', () => {
		const { container } = render(<CardTile {...JSON.CARD_OBJ_DATA}></CardTile>);
		expect(container.getElementsByClassName('card space-m-b-3').length).toBe(1);
	});

	it('Validate CardTile elements having image tag', () => {
		const { container } = render(<CardTile {...JSON.CARD_OBJ_DATA}></CardTile>);
		expect(container.getElementsByTagName('div')).toBeTruthy();
		expect(container.getElementsByTagName('img').length).toBe(1);
	});
});
