import React from 'react';
import { NavLink } from 'react-router-dom';

import {
	Footer,
	ContentPosition,
	Breadcrumb,
	BreadcrumbItem,
} from 'yarn-design-system-react-components';

// Footer component
const FooterComp = ({ pathName }) => {
	return (
		<>
			<Footer className='bg-brand-color-2'>
				<ContentPosition position='left'>
					<Breadcrumb>
						<BreadcrumbItem>Adidas</BreadcrumbItem>
					</Breadcrumb>
				</ContentPosition>
			</Footer>
		</>
	);
};

export default FooterComp;
