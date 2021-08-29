import CONTANTS from '../constants';

/**
 * validate squad by key country
 * @param {object} - receives a object node
 * @return {boolean} - returns a status as true or false
 */
const validateSquadByCountry = (obj) => {
	let countryData = {};
	let count = 1;

	for (let [key, value] of Object.entries(obj)) {
		if (countryData[value.nationality]) {
			countryData[value.nationality] += 1;
		} else {
			count = 1;
			countryData[value.nationality] = count;
		}
	}
	return countByCountryValidatorHelper(countryData);
};

/**
 * validate squad by key position
 * @param {object} - receives a object node
 * @return {boolean} - returns a status as true or false
 */
const validateSquadByPosition = (obj) => {
	let isValidTeam = false;
	let positionData = {};
	let count = 1;

	for (let [key, value] of Object.entries(obj)) {
		if (positionData[value.position]) {
			positionData[value.position] += 1;
		} else {
			count = 1;
			positionData[value.position] = count;
		}
	}
	isValidTeam = countByPositionValidatorHelper(positionData);
	return isValidTeam;
};

/**
 * validate squad length with a constant
 * @param {object} - receives a object node
 * @return {boolean} - returns a status as true or false
 */
const validateSquadByCount = (obj) => {
	return Object.keys(obj).length >= CONTANTS.TEAM_SIZE;
};

/**
 * get squad count by position
 * @param {object} - receives a object node
 * @return {boolean} - returns a status as true or false
 */
const getSquadByPosition = (obj) => {
	let positionsData = {};
	let count = 1;

	for (let [key, value] of Object.entries(obj)) {
		if (positionsData[value.position]) {
			positionsData[value.position] += 1;
		} else {
			count = 1;
			positionsData[value.position] = count;
		}
	}
	return positionsData;
};

/**
 * helper method on position
 * @param {object} - receives a object node
 * @return {boolean} - returns a status as true or false
 */
const countByPositionValidatorHelper = (obj) => {
	if (Object.keys(obj).length == CONTANTS.PLAYERS_TYPE_COUNT) {
		if (
			obj[CONTANTS.TYPE_ATTACKER] == CONTANTS.MIN_ATTACKERS_COUNT &&
			obj[CONTANTS.TYPE_DEFENDER] == CONTANTS.MIN_DEFENDERS_COUNT &&
			obj[CONTANTS.TYPE_GOALKEEPER] == CONTANTS.MIN_GOALKEEPER_COUNT &&
			obj[CONTANTS.TYPE_MIDFIELDER] == CONTANTS.MIN_MIDFIELDERS_COUNT
		) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
};

/**
 * helper method on country
 * @param {object} - receives a object node
 * @return {boolean} - returns a status as true or false
 */
const countByCountryValidatorHelper = (obj) => {
	let status = false;
	for (let [key, value] of Object.entries(obj)) {
		if (value <= CONTANTS.MAX_SAME_COUNTRY_COUNT) {
			status = true;
		}
	}
	return status;
};

export {
	validateSquadByCountry,
	validateSquadByPosition,
	validateSquadByCount,
	getSquadByPosition,
};
