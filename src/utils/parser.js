import CONTANTS from '../constants';

const Parser = {
	/**
	 * @param {object} - receives an array
	 * @return {object} - return parsed object with new keys
	 */
	createOptionObj: (arr) => {
		let res = [];
		arr &&
			arr.forEach((item, key) => {
				res.push({
					value: item.id,
					label: item.name,
					isSelected: false,
					isDisabled: item.dateOfBirth < CONTANTS.PLAYER_AGE,
					nationality: item.nationality,
					position: item.position,
				});
			});
		return res;
	},
	/**
	 * @param {string} - receives an date as string
	 * @return {number} - returns calculated age
	 */
	getAge: (time) => {
		var dateArr = time.split('-');
		var years = parseInt(
			(new Date() - new Date(dateArr[0], dateArr[1], dateArr[2])) /
				CONTANTS.YEARS_IN_MS
		);
		return years;
	},
};

export default Parser;
