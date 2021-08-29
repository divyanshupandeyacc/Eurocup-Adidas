import { createSlice } from '@reduxjs/toolkit';

import dataUtils from '../utils/data';

const nameSpace = 'teamFormed';

// action with reducer to save created squad
const teamFormedSlice = createSlice({
	name: nameSpace,
	initialState: { loading: false, data: [] },
	reducers: {
		teamListAction: (state, action) => {
			state.loading = true;
			state.data = dataUtils.getData();
		},
		setTeamAction: (state, action) => {
			state.loading = true;
			state.data = [...state.data, action.payload];
		},
	},
});

export const { teamListAction, setTeamAction } = teamFormedSlice.actions;
export default teamFormedSlice.reducer;
