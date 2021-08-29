import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getMatches } from '../api/common-services';

const nameSpace = 'matches';

// fetch action to get matcheslist
export const fetchMatches = createAsyncThunk(
	`${nameSpace}/fetchMatches`,
	async (param, thunkAPI) => {
		const resList = await getMatches();
		return resList;
	}
);

const matchesSlice = createSlice({
	name: nameSpace,
	initialState: { loading: false, data: [] },
	extraReducers: {
		[fetchMatches.pending](state) {
			state.loading = false;
			state.data = [];
		},

		[fetchMatches.fulfilled](state, { payload }) {
			state.loading = true;
			state.data = payload;
		},
		[fetchMatches.rejected](state) {
			state.loading = false;
			state.data = [];
		},
	},
});

export default matchesSlice.reducer;
