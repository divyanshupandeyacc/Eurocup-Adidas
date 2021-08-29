import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import sessionUtils from '../utils/session';

// authentication effect
const useAuthentication = (history) => {
	const userInfo = useSelector((state) => {
		return state.userInfo;
	});

	const hasToken = () => {
		return !!sessionUtils.getSessionLocalStorage();
	};

	const [isAuthentication, setIsAuthentication] = useState(
		hasToken() || !!userInfo.data
	);

	const VerifyAuthentication = () => {
		window.scrollTo(0, 0);
		setIsAuthentication(hasToken());
	};

	useEffect(() => {
		history.listen(VerifyAuthentication);
	});

	return isAuthentication;
};

export default useAuthentication;
