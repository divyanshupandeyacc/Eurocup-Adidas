import React, { useState } from 'react';
import {
	Accordion,
	AccordionItem,
	AccordionItemContent,
	AccordionItemHeader,
	ContentPosition,
} from 'yarn-design-system-react-components';

// Grid tile layout
const GridTile = ({ attributesObj, indexing, handleShowDetails }) => {
	const [teamsDetails, setTeamsDetails] = useState([]);
	const [toggleVisibility, setToggleVisibility] = useState(false);
	const handleClick = (event) => {
		setTeamsDetails(attributesObj);
		setToggleVisibility(!toggleVisibility);
		handleShowDetails(attributesObj, !toggleVisibility);
	};
	return (
		<>
			<Accordion
				data-accordian='accordian'
				hierarchy
				shadow
				singleItemPersistent
				triggerPosition='before'
				type='multiple'
				onClick={(event) => {
					handleClick(attributesObj);
				}}>
				<AccordionItem itemId={`id:${indexing}`}>
					<AccordionItemHeader>
						<ContentPosition position='left'>
							Team name:
							<span>{attributesObj.area}</span>
						</ContentPosition>
					</AccordionItemHeader>
					<AccordionItemContent>
						<p className='space-p-3'>
							<strong>Total Members:</strong> <br></br>
							{attributesObj &&
								attributesObj.teams_list &&
								attributesObj.teams_list.map((item, index) => {
									return (
										<div key={index}>
											{++index}. <strong>{item.label}</strong> from{' '}
											<strong>{item.nationality}</strong> as{' '}
											<strong>{item.position}</strong>
											<br></br>
										</div>
									);
								})}
						</p>
					</AccordionItemContent>
				</AccordionItem>
			</Accordion>
		</>
	);
};

export default GridTile;
