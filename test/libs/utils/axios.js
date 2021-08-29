import axios from 'axios';
const API_HOST = process.env.API_HOST;
const TOKEN = process.env.TOKEN;

// TODO const axiosMock = jest.createMockFromModule('axios');

const fakeApiService = axios.create({
	baseURL: API_HOST,
	headers: {
		'X-Auth-Token': TOKEN,
	},
});

const axiosMock = (data) => {
	return { get: jest.fn(() => Promise.resolve(mockPlayersListData)) };
};

export { fakeApiService, axiosMock };
