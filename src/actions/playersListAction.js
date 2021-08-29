import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPlayersList } from '../api/common-services';
import Parser from '../utils/parser';

const nameSpace = 'playersList';

// fetch action to get players list
export const fetchPlayersList = createAsyncThunk(
	`${nameSpace}/fetchPlayersList`,
	async (param, thunkAPI) => {
		const resList = await getPlayersList(param);
		return resList;
	}
);

const playersListSlice = createSlice({
	name: nameSpace,
	initialState: { loading: false, data: [] },
	extraReducers: {
		[fetchPlayersList.pending](state) {
			state.loading = false;
			state.data = [];
		},

		[fetchPlayersList.fulfilled](state, { payload }) {
			state.loading = true;
			state.data = [
				...state.data,
				...Parser.createOptionObj(payload && payload.squad ? payload.squad : []),
			];
		},
		[fetchPlayersList.rejected](state) {
			state.loading = false;
			state.data = [];
		},
	},
});

export default playersListSlice.reducer;
