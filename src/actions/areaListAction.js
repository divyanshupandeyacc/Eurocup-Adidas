import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAreas } from '../api/common-services';
import Parser from '../utils/parser';

const nameSpace = 'areasList';

// fetch action to get areas list
export const fetchAreaList = createAsyncThunk(
	`${nameSpace}/fetchAreaList`,
	async (param, thunkAPI) => {
		const resList = await getAreas();
		return resList;
	}
);

const areasListSlice = createSlice({
	name: nameSpace,
	initialState: { loading: false, data: [] },
	extraReducers: {
		[fetchAreaList.pending](state) {
			state.loading = false;
			state.data = [];
		},

		[fetchAreaList.fulfilled](state, { payload }) {
			state.loading = true;
			state.data = Parser.createOptionObj(
				payload && payload.areas ? payload.areas : []
			);
		},
		[fetchAreaList.rejected](state) {
			state.loading = false;
			state.data = [];
		},
	},
});

export default areasListSlice.reducer;
