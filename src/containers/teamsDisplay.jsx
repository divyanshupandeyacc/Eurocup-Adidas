// React imports
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Chip } from 'yarn-design-system-react-components';

// custom imports for layouts
import SidebarComp from '../components/Layouts/Sidebar';
import ToolbarComp from '../components/Layouts/Toolbar';
import GridTile from '../components/Shared/GridTile';
import NoDataFound from '../components/Shared/NoDataFound';
import CONSTANTS from '../constants';


const TeamsDisplayContainer = (props) => {
	const [detailsShown, setDetailsShown] = useState([]);
	const [toggleToolBar, setToggleToolBar] = useState(false);
	const [filterKeyOnTeamsName, setFilterKeyOnTeamsName] = useState('');
	const dispatch = useDispatch();
	const data = useSelector((state) => {
		return state;
	});

	// filter data handling
	let filterTeamsData =
		data.teamsList.loading &&
		data.teamsList.data.filter((item, key) => {
			return (
				item.area.toLowerCase().indexOf(filterKeyOnTeamsName.toLowerCase()) != -1
			);
		});

	const handleToolBarChange = () => {
		setToggleToolBar(!toggleToolBar);
	};

	const handleChange = (event) => {
		setFilterKeyOnTeamsName(event);
	};

	const handleShowDetailsEvent = (event, toggleVisibility) => {
		setDetailsShown(toggleVisibility ? event : []);
	};
	React.useEffect(() => {}, []);

	return (
		<>
			<ToolbarComp
				handleToggle={handleToolBarChange}
				routeToShow='Squad'></ToolbarComp>
			<main className='main'>
				<SidebarComp toggleFlag={toggleToolBar} title='Filters'>
					<TextField
						active={true}
						disabled={false}
						placeholder='Type...'
						id='username'
						label='Search on Teams name'
						rows={3}
						type='text'
						value={filterKeyOnTeamsName}
						onChange={(event) => {
							handleChange(event);
						}}
					/>
				</SidebarComp>
				<div className='container space-m-5'>
					<div className='row mock-content'>
						<div className='col-md-6 ad-scroll'>
							<h4>Team List</h4>
							{filterTeamsData && filterTeamsData.length > 0 ? (
								filterTeamsData.map((item, index) => {
									return (
										<GridTile
											attributesObj={item}
											indexing={index}
											handleShowDetails={handleShowDetailsEvent}
											key={`ad-${index}`}></GridTile>
									);
								})
							) : (
								<NoDataFound />
							)}
						</div>
						<div className='col-md-6 ad-ground text-center '>
							{_renderHeading(detailsShown)}
							<div>{_renderFields(detailsShown, CONSTANTS.TYPE_GOALKEEPER)}</div>
							<div>{_renderFields(detailsShown, CONSTANTS.TYPE_DEFENDER)}</div>
							<div>{_renderFields(detailsShown, CONSTANTS.TYPE_MIDFIELDER)}</div>
							<div>{_renderFields(detailsShown, CONSTANTS.TYPE_ATTACKER)}</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
};

const _renderHeading = (obj) => {
	return (
		obj &&
		obj.area && (
			<Chip type='default' size='lg' className='space-m-t-2'>
				{obj.area}
			</Chip>
		)
	);
};

const _renderFields = (obj, TYPE) => {
	return (
		obj &&
		obj.teams_list &&
		obj.teams_list
			.filter((item, key) => {
				return item.position == TYPE;
			})
			.map((item, key) => {
				return (
					<Chip
						size='sm'
						type='default'
						className='space-m-t-4 space-m-r-1 space-m-l-1'>
						{item.label}
					</Chip>
				);
			})
	);
};

export default TeamsDisplayContainer;
