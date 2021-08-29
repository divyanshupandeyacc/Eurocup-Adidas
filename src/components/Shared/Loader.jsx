import React from 'react';
import { Loader } from 'yarn-design-system-react-components';

// Loader element
const AdLoader = () => {
	return (
		<div className='ad-loader'>
			<Loader size='md' className='loader'></Loader>
		</div>
	);
};

export default AdLoader;
