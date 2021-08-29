import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
	Toolbar,
	ContentPosition,
	Button,
	Divider,
	Icon,
} from 'yarn-design-system-react-components';

const ToolbarComp = (props) => {
	const [toggleVisibility, setToggleVisibility] = useState(false);
	const toggleEvent = () => {
		setToggleVisibility(!toggleVisibility);
		props.handleToggle(toggleVisibility);
	};

	return (
		<>
			<Toolbar responsive='true'>
				<ContentPosition position='left'>
					<React.Fragment key='.0'>
						<Button behavior='button' type='icon' onClick={(event) => toggleEvent()}>
							<Icon name='dashboard' size='md' status='default' />
						</Button>
						<Divider type='vertical' />
					</React.Fragment>
				</ContentPosition>
				<ContentPosition position='right'>
					<React.Fragment key='.0'>
						<NavLink to={`/${props.routeToShow}`}>
							<Button behavior='button' type='primary'>
								<Icon name='fill-color' size='md' status='default' />
								<span>{`${props.routeToShow}`}</span>
							</Button>
						</NavLink>
					</React.Fragment>
				</ContentPosition>
			</Toolbar>
		</>
	);
};

export default ToolbarComp;
