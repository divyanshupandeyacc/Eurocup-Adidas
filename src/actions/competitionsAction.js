import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCompetetions } from '../api/common-services';
import Parser from '../utils/parser';

const nameSpace = 'competitions';

// fetch action to get competitions list
export const fetchCompetitions = createAsyncThunk(
	`${nameSpace}/fetchCompetitions`,
	async (param, thunkAPI) => {
		const resList = await getCompetetions(param);
		return resList;
	}
);

const competitionsSlice = createSlice({
	name: nameSpace,
	initialState: { loading: false, data: [] },
	extraReducers: {
		[fetchCompetitions.pending](state) {
			state.loading = false;
			state.data = [];
		},

		[fetchCompetitions.fulfilled](state, { payload }) {
			state.loading = true;
			state.data = payload;
		},
		[fetchCompetitions.rejected](state) {
			state.loading = false;
			state.data = [];
		},
	},
});

export default competitionsSlice.reducer;
