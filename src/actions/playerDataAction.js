import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPlayerData } from '../api/common-services';
import Parser from '../utils/parser';

const nameSpace = 'playerData';

// fetch action to get players list
export const fetchPlayerData = createAsyncThunk(
	`${nameSpace}/fetchPlayerData`,
	async (param, thunkAPI) => {
		const res = await getPlayerData(param);
		return res;
	}
);

const playerDataSlice = createSlice({
	name: nameSpace,
	initialState: { loading: false, data: {}, ageInYears: null },
	extraReducers: {
		[fetchPlayerData.pending](state) {
			state.loading = false;
			state.data = {};
			state.ageInYears = null;
		},

		[fetchPlayerData.fulfilled](state, { payload }) {
			state.loading = true;
			state.data = payload;
			state.ageInYears = Parser.getAge(
				payload && payload.dateOfBirth ? payload.dateOfBirth : []
			);
		},
		[fetchPlayerData.rejected](state) {
			state.loading = false;
			state.data = {};
			state.ageInYears = null;
		},
	},
});

export default playerDataSlice.reducer;
