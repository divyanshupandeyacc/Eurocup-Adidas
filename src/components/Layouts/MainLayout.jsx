import React from 'react';
import Config from '../../config/index';

import HeaderComp from './Header';
import Footer from './Footer';

// Main layout as wrapper
const MainLayout = (props) => {
	return (
		<>
			<HeaderComp {...props} />
			{props.children}
			<Footer />
		</>
	);
};

export default MainLayout;
