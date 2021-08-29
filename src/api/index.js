import axios from 'axios';
import Config from '../config';

// import API constanst from config
const API_HOST = Config.API_HOST;
const TOKEN = Config.TOKEN;

/**
 *  method name - aouService
 * @returns {object} request object
 */
const apiService = axios.create({
	baseURL: API_HOST,
	headers: {
		'X-Auth-Token': TOKEN,
	},
});

// TODO: activate when POST/PUT API are available
//  authService.interceptors.request.use((config) => {
//	let updateConfig = { ...config };
//	updateConfig = {
//		...updateConfig,
//		headers: {
//			...config.headers,
//			Authorization: `Token ${REACT_APP_TOKEN}`,
//		},
//	};
//	return updateConfig;
// TODO: });

export default apiService;
