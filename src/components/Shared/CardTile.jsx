import React from 'react';

import {
	Card,
	CardTitle,
	CardBody,
	CardHeader,
	CardAttributes,
	CardAttribute,
	OverflowMenu,
	List,
	ListItem,
	ListItemLabel,
	Icon,
} from 'yarn-design-system-react-components';

// Card tile shared layout
const CardTile = ({ attributesObj }) => {
	if (!attributesObj) return null;
	return (
		<Card name='flat' className='space-m-b-3' status={null} data-id='card'>
			<CardHeader
				image={
					attributesObj && attributesObj.emblemUrl
						? attributesObj.emblemUrl
						: 'https://via.placeholder.com/100?text=No+Image'
				}>
				<OverflowMenu
					direction='left'
					position='bottom'
					size='sm'
					trigger={<Icon name='more' size='md' status='default' />}
					triggerType='icon'>
					<List type='ul'>
						<ListItem dangerous={undefined} disabled={undefined} interactive>
							<ListItemLabel>
								Seasons : {attributesObj && attributesObj.numberOfAvailableSeasons}
							</ListItemLabel>
						</ListItem>
						<ListItem dangerous={undefined} disabled={undefined} interactive>
							<ListItemLabel>
								Current Match Day :{' '}
								{attributesObj &&
								attributesObj.currentSeason &&
								attributesObj.currentSeason.currentMatchday
									? attributesObj.currentSeason.currentMatchday
									: 'No data'}
							</ListItemLabel>
						</ListItem>
					</List>
				</OverflowMenu>
			</CardHeader>
			<CardBody>
				<CardTitle>
					{attributesObj && attributesObj.name} - Played at{' '}
					{attributesObj && attributesObj.area && attributesObj.area.name
						? attributesObj.area.name
						: 'No Data'}
				</CardTitle>
				<CardAttributes
					renderHiddenElements={function (attributes) {
						return react_default.a.createElement(
							dist.CardAttribute,
							{ className: 'link' },
							'+',
							attributes.length,
							' more'
						);
					}}>
					<CardAttribute>Plan - {attributesObj && attributesObj.plan}</CardAttribute>
					<CardAttribute>
						Season duration -
						{attributesObj &&
							attributesObj.currentSeason &&
							attributesObj.currentSeason.startDate}{' '}
						till{' '}
						{attributesObj &&
							attributesObj.currentSeason &&
							attributesObj.currentSeason.endDate}
					</CardAttribute>
				</CardAttributes>
			</CardBody>
		</Card>
	);
};

export default CardTile;
