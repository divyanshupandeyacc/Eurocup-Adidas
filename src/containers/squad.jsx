// React imports
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	SelectionControl,
	Divider,
	Dropdown,
	Button,
	Chip,
} from 'yarn-design-system-react-components';

// custom imports
import AdLoader from '../components/Shared/Loader';
import {
	validateSquadByCountry,
	validateSquadByPosition,
	validateSquadByCount,
	getSquadByPosition,
} from '../utils/squad-validator';

// actions imports
import { fetchAreaList } from '../actions/areaListAction';
import { fetchSubAreaList } from '../actions/subAreaAction';
import { fetchPlayersList } from '../actions/playersListAction';
import { setTeamAction } from '../actions/teamFormedAction';
import ToolbarComp from '../components/Layouts/Toolbar';
import NoDataFound from '../components/Shared/NoDataFound';

import CONSTANTS from '../constants'; //  constants import

// Component's default objects
const inititalInputState = {
	area: '',
	sub_area: '',
	teams_list: {},
};

const intitialStateForPlayersByPosition = {
	Goalkeeper: 0,
	Attacker: 0,
	Midfielder: 0,
	Defender: 0,
};

let teamsPlayerList = [];

const SquadContainer = (props) => {
	const [isSubmitValid, setIsSubmitalid] = useState(false); // to check if all validation are set true
	const [playerByPosition, setPlayersByPosition] = useState({
		...intitialStateForPlayersByPosition,
	});
	const [formData, setFormData] = useState({ ...inititalInputState });

	const dispatch = useDispatch();
	const data = useSelector((state) => {
		return state;
	});

	// areas's/subareas selection event
	const handleChange = (event, type) => {
		console.log(event);
		if (!!event) {
			setFormData({ ...formData, [type]: event.label });
			if (type == CONSTANTS.AREAS_LABEL) {
				dispatch(fetchSubAreaList(event.value));
			}
		} else {
			if (type == CONSTANTS.AREAS_LABEL) {
				setFormData({
					...formData,
					[CONSTANTS.SUBAREA_LABEL]: '',
					[CONSTANTS.AREAS_LABEL]: '',
				});
			} else {
				setFormData({
					...formData,
					[CONSTANTS.SUBAREA_LABEL]: '',
				});
			}
		}
	};

	// cehckbox selection
	const handleCheckboxClick = (event, type, item, key) => {
		if (event.target.checked == true) {
			teamsPlayerList[item.value] = item;
		} else {
			delete teamsPlayerList[item.value];
		}
		setFormData({ ...formData, [type]: teamsPlayerList });
		setIsSubmitalid(
			validateSquadByPosition(formData.teams_list) &&
				validateSquadByCount(formData.teams_list) &&
				validateSquadByCountry(formData.teams_list)
		);
		setPlayersByPosition({
			...getSquadByPosition(formData.teams_list),
		});
	};

	// handle create squad CTA
	const handleSubmit = (event, data) => {
		let mappedData = [];
		data.teams_list.forEach((item, key) => {
			mappedData.push(item);
		});
		dispatch(setTeamAction({ ...data, teams_list: mappedData }));
		_cleanAllState();
	};

	const handleReset = (event) => {
		_cleanAllState();
	};

	// reset method
	const _cleanAllState = () => {
		setFormData({ ...inititalInputState });
		setPlayersByPosition({ ...intitialStateForPlayersByPosition });
		teamsPlayerList = [];
	};

	React.useEffect(() => {
		dispatch(fetchAreaList());
		dispatch(fetchPlayersList(CONSTANTS.TEAM_ONE));
		dispatch(fetchPlayersList(CONSTANTS.TEAM_TWO));
		dispatch(fetchPlayersList(CONSTANTS.TEAM_THREE));
	}, []);

	return (
		<>
			<ToolbarComp routeToShow='Team' />
			<main className='main'>
				<div className='container space-m-b-3'>
					<div className='row mock-content'>
						<div className='col-md-12'>
							{!data.areasList.loading &&
								!data.areasList.loading &&
								!data.subAreasList.loading && <AdLoader />}
							<div className='container space-p-2'>
								<div className='row'>
									<div className='col-md-7'>
										<div className='row'>
											<div className='col-md-6'>
												<Dropdown
													type='single'
													label='Select Area'
													disabled={!data.areasList.loading}
													options={data.areasList.data}
													defaultValue={formData.area}
													onChange={(event) => {
														handleChange(event, CONSTANTS.AREAS_LABEL);
													}}
												/>
											</div>
											<div className='col-md-6'>
												<Dropdown
													type='single'
													disabled={
														!data.subAreasList.loading || data.subAreasList.data.length == 0
													}
													label='Select Sub-area'
													options={data.subAreasList.data}
													defaultValue={formData.sub_area}
													onChange={(event) => {
														handleChange(event, CONSTANTS.SUBAREA_LABEL);
													}}
												/>
											</div>
										</div>
										<div className='row space-m-t-2 ad-scroll'>
											<div className='col-md-12'>
												<Divider type='horizontal' className='space-m-b-4' />
												Select Players
												{data.playersList.loading && data.playersList.data.length > 0 ? (
													data.playersList.data.map((item, key) => {
														return (
															<div key={key}>
																<SelectionControl
																	checked={false}
																	disabled={
																		!data.areasList.loading ||
																		item.isDisabled ||
																		!item.nationality ||
																		!item.position ||
																		!formData.area
																	}
																	name='checkbox-md'
																	size='md'
																	type='checkbox'
																	defaultValue={formData.teams_list}
																	onClick={(event) => {
																		handleCheckboxClick(event, CONSTANTS.TEAMS_LABEL, item, key);
																	}}>
																	{item.label}{' '}
																	{item.isDisabled ? `(age restriction)` : `(${item.position})`}
																</SelectionControl>
															</div>
														);
													})
												) : (
													<NoDataFound />
												)}
											</div>
										</div>
									</div>
									<div className='col-md-5'>
										<h4>SQUAD LAYOUT</h4>
										<div className='ad-ground'>
											<div className='row space-p-3'>
												<div className='col-12'>
													Team Name:{' '}
													<Chip>
														<strong>{formData.area}</strong>
													</Chip>
												</div>
												<div className='col-12'>
													Player's Count:{' '}
													<Chip>
														<strong>{Object.keys(formData.teams_list).length}</strong>
													</Chip>
												</div>
											</div>
											<div className='row'>
												<div className='col-12 space-p-3'>
													<strong>Player category</strong>
												</div>
												{_renderPlayerByPositions(
													playerByPosition,
													CONSTANTS.TYPE_GOALKEEPER
												)}
												{_renderPlayerByPositions(
													playerByPosition,
													CONSTANTS.TYPE_DEFENDER
												)}
												{_renderPlayerByPositions(
													playerByPosition,
													CONSTANTS.TYPE_ATTACKER
												)}
												{_renderPlayerByPositions(
													playerByPosition,
													CONSTANTS.TYPE_MIDFIELDER
												)}
											</div>
											<div className='row space-p-3'>
												<div className='col-12'>
													<strong>Player's Name:</strong>
												</div>
												<div className='col-12'>
													{Object.entries(formData.teams_list).map((item, key) => {
														return (
															<Chip size='sm' type='default' key={key}>
																{item[1].label} ({item[1].position}) ,
															</Chip>
														);
													})}
													<br></br>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className='col-md-12 text-right'>
							<Button
								className='space-m-r-3'
								disabled={false}
								behavior='button'
								type='action'
								onClick={(event) => {
									handleReset();
								}}>
								Reset
							</Button>
							<Button
								disabled={!isSubmitValid}
								behavior='button'
								type='action'
								onClick={(event) => {
									handleSubmit(event, formData);
								}}>
								Create
							</Button>
						</div>
					</div>
				</div>
			</main>
		</>
	);
};

const _renderPlayerByPositions = (obj, TYPE) => {
	return (
		<div className='col-md-3'>
			<Chip size='sm' type='default' className='space-m-r-1 space-m-l-1'>
				{TYPE}: <strong>{obj[TYPE] || '0'}</strong>
			</Chip>
		</div>
	);
};

export default SquadContainer;
