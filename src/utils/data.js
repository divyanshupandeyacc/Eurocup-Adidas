const dataUtils = {
	/**
	 * data utility service - setData()
	 *
	 * @param {JSON} data - data as JSON
	 * @returns {JSON} updated JSON.
	 */
	setData: (data) => {
		localStorage.setItem('teamData', JSON.stringify(data));
		return JSON.parse(localStorage.getItem('teamData'));
	},
	/**
	 * data utility service - setData()
	 * @param {string} key - string key
	 */
	removeData: (key) => {
		localStorage.removeItem('teamData');
	},
	/**
	 * data utility service - setData()
	 * @returns {JSON} updated JSON.
	 */
	getData: () => {
		let res = [];
		if (localStorage.getItem('teamData')) {
			res = JSON.parse(localStorage.getItem('teamData'));
		}
		return res;
	},
};

export default dataUtils;
