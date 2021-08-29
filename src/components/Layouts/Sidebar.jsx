import React from 'react';
import {
	Sidebar,
	List,
	ListItem,
	ListItemLabel,
} from 'yarn-design-system-react-components';

const SidebarComp = ({ toggleFlag = false, title = '', children }) => {
	return (
		<>
			<Sidebar
				animated={true}
				closable={false}
				id='sidebar'
				open={toggleFlag}
				position='left'
				size='md'
				responsive='true'>
				<React.Fragment key='.0'>
					<h6 className='space-p-l-3'>{title}</h6>
					<List type='ul'>
						<ListItem interactive>
							<ListItemLabel>{children}</ListItemLabel>
						</ListItem>
					</List>
				</React.Fragment>
			</Sidebar>
		</>
	);
};

export default SidebarComp;
