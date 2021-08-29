// React imports
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField } from 'yarn-design-system-react-components';

// Custom Components import
import CardTile from '../components/Shared/CardTile';
import ListTile from '../components/Shared/ListTile';
import NoDataFound from '../components/Shared/NoDataFound';

// Layouts import
import SidebarComp from '../components/Layouts/Sidebar';
import ToolbarComp from '../components/Layouts/Toolbar';

// Actions creator import
import { fetchCompetitions } from '../actions/competitionsAction';
import { fetchMatches } from '../actions/matchesAction';

// Shared component import
import AdLoader from '../components/Shared/Loader';

// Contants import
import CONSTANTS from '../constants';

const LeaguesContainer = (props) => {
	// setting up state
	const [toggleToolBar, setToggleToolbar] = useState(false);
	const [filterKeyOnCompetition, setFilterKeyOnCompetition] = useState('');
	const [filterKeyOnMatches, setFilterKeyOnMatches] = useState('');

	// creating dispatcher
	const dispatch = useDispatch();

	// receiving data from state
	const data = useSelector((state) => {
		return state;
	});

	// Custome filter implementations - start
	let filteredCompetitionData =
		data.competitions.loading &&
		data.competitions &&
		data.competitions.data &&
		data.competitions.data.competitions.filter((item) => {
			return (
				item.name &&
				item.name.toLowerCase().indexOf(filterKeyOnCompetition.toLowerCase()) !== -1
			);
		});
	let filteredMatchesData =
		data.matches.loading &&
		data.matches &&
		data.matches.data &&
		data.matches.data.matches.filter((item) => {
			return (
				item.competition &&
				item.competition.name &&
				item.competition.name
					.toLowerCase()
					.indexOf(filterKeyOnMatches.toLowerCase()) !== -1
			);
		});
	// end

	// toggle event for toolbar
	const handleToolBarChange = (event) => {
		setToggleToolbar(!toggleToolBar);
	};

	// change event for key in filters
	const handleChange = (event, type) => {
		type == CONSTANTS.COMPETITIONS_LEVEL
			? setFilterKeyOnCompetition(event)
			: setFilterKeyOnMatches(event);
	};

	// side effect once states updated
	React.useEffect(() => {
		dispatch(fetchCompetitions());
		dispatch(fetchMatches());
	}, []);

	// Component
	return (
		<>
			<ToolbarComp
				handleToggle={handleToolBarChange}
				routeToShow='Team'></ToolbarComp>
			<main className='main'>
				<SidebarComp toggleFlag={toggleToolBar} title='Filters'>
					<TextField
						active={true}
						disabled={false}
						id='username'
						placeholder='Type...'
						label='Search on Competitions'
						rows={3}
						type='text'
						value={filterKeyOnCompetition}
						onChange={(event) => {
							handleChange(event, CONSTANTS.COMPETITIONS_LEVEL);
						}}
					/>
					<TextField
						active={true}
						disabled={false}
						id='username'
						placeholder='Type...'
						label='Search on Matches'
						rows={3}
						type='text'
						value={filterKeyOnMatches}
						onChange={(event) => {
							handleChange(event, CONSTANTS.AREAS_LABEL);
						}}
					/>
				</SidebarComp>
				<div className='container space-m-5'>
					<div className='row mock-content'>
						<div className='col-md-6'>
							<h4>Competitions Leagues</h4>
							{!data.competitions.loading && <AdLoader />}
							<div className='ad-scroll space-p-3'>
								{data.competitions.loading &&
								filteredCompetitionData &&
								filteredCompetitionData.length > 0 ? (
									filteredCompetitionData.map((item, index) => {
										return <CardTile attributesObj={item} key={index} />;
									})
								) : (
									<NoDataFound />
								)}
							</div>
						</div>
						<div className='col-md-6'>
							<h4>Matches Leagues</h4>
							{!data.matches.loading && <AdLoader />}
							<div className='ad-scroll'>
								{data.matches.loading &&
								filteredMatchesData &&
								filteredMatchesData.length > 0 ? (
									filteredMatchesData.map((item, index) => {
										return <ListTile attributesObj={item} key={index} />;
									})
								) : (
									<NoDataFound />
								)}
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
};

export default LeaguesContainer;
