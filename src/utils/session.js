const sessionUtils = {
	/**
	 * set true value in loadal storage with key isLoggedIn
	 */
	setSessionLocalStorage: () => {
		localStorage.setItem('isLoggedIn', true);
	},
	/**
	 * removes localstorage key
	 */
	removeSessionLocalStorage: () => {
		localStorage.removeItem('isLoggedIn');
	},
	/**
	 * @return {boolean} - returns session value as boolean
	 */
	getSessionLocalStorage: () => {
		return (
			localStorage.getItem('isLoggedIn') &&
			localStorage.getItem('isLoggedIn') == 'true'
		);
	},
};

export default sessionUtils;
