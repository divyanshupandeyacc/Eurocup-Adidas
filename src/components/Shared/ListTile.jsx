import React from 'react';

import {
	Card,
	CardTitle,
	CardBody,
	Paper,
} from 'yarn-design-system-react-components';

// list tile layout
const ListTile = ({ attributesObj }) => {
	if (!attributesObj) return null;
	return (
		<Card name='basic' className='space-m-3' status={null}>
			<CardBody>
				<CardTitle>
					Competition title:{' '}
					{attributesObj &&
						attributesObj.competition &&
						attributesObj.competition.name}
					Staged in {attributesObj.stage} during{' '}
					{attributesObj.season && attributesObj.season.startDate} till{' '}
					{attributesObj.season && attributesObj.season.endDate}
				</CardTitle>
				<CardTitle>Live status {attributesObj.status}</CardTitle>
				<Paper className='bg-brand-color-3 space-p-2'>
					Match Summary:{' '}
					{attributesObj && attributesObj.odds && attributesObj.odds.msg}
					<br></br> Home team :{' '}
					{attributesObj && attributesObj.homeTeam && attributesObj.homeTeam.name}
				</Paper>
			</CardBody>
		</Card>
	);
};

export default ListTile;
