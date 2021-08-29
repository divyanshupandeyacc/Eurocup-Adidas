// auth service creator import
import apiService from './index';

// session service import
import sessionUtils from '../utils/session';

// object parser import
import Parser from '../utils/parser';

/**
 *  method name - getAreas
 * @returns {object} object list of areas.
 */
const getAreas = async () => {
	try {
		const { data } = await apiService.get('/areas/');
		return data;
	} catch (e) {}
};

/**
 *  method name - getSubAreas
 * @param {string || number} - areas id
 * @returns {object} object list of sub areas.
 */
const getSubAreas = async (id) => {
	try {
		const { data } = await apiService.get(`/areas/${id}`);
		return data;
	} catch (e) {
		console.log(e);
	}
};

/**
 *  method name - getPlayersList team wise
 * @param {string || number} - team id
 * @returns {object} object list of players.
 */
const getPlayersList = async (id) => {
	try {
		const { data } = await apiService.get(`/teams/${id}`);
		data.squad.map((item) => {
			item['dateOfBirth'] = Parser.getAge(item.dateOfBirth.split('T')[0]);
		});
		return data;
	} catch (e) {
		console.log(e);
	}
};

/**
 *  method name - getCompetetions
 * @returns {object} all competitions
 */
const getCompetetions = async () => {
	try {
		const { data } = await apiService.get(`/competitions`);
		return data;
	} catch (e) {
		console.log(e);
	}
};

/**
 *  method name - getMatches
 * @returns {object} all matches day wise
 */
const getMatches = async () => {
	try {
		const { data } = await apiService.get(`/matches`);
		return data;
	} catch (e) {
		console.log(e);
	}
};

/**
 *  method name - getSession
 * @returns {boolean} get tokenas true or false from localstorage
 */
const getSession = async () => {
	const hasToken = sessionUtils.getSessionLocalStorage();
	return hasToken;
};

/**
 *  method name - getPlayerData
 * @param {string || number} - pass a team member id
 * @returns {object} individual player data
 */
const getPlayerData = async (id) => {
	try {
		const { data } = await apiService.get(`/players/${id}`);
		return data;
	} catch (e) {
		console.log(e);
	}
};

/**
 *  method name - setSession
 * @returns {boolean} token as true from localstorage
 */
const setSession = async () => {
	const hasToken = sessionUtils.setSessionLocalStorage();
	return hasToken;
};

/**
 *  method name - removeSession
 * @returns {boolean} removes token from localstorage
 */
const removeSession = async () => {
	sessionUtils.removeSessionLocalStorage();
	const hasToken = !!sessionUtils.getSessionLocalStorage();
	return hasToken;
};

export {
	getAreas,
	getSubAreas,
	getPlayersList,
	getCompetetions,
	getMatches,
	getSession,
	removeSession,
	setSession,
	getPlayerData,
};
