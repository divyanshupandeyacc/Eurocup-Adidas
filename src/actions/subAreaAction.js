import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getSubAreas } from '../api/common-services';
import Parser from '../utils/parser';

const nameSpace = 'subAreasList';

// fetch action to get sub srea
export const fetchSubAreaList = createAsyncThunk(
	`${nameSpace}/fetchSubAreaList`,
	async (param, thunkAPI) => {
		const resList = await getSubAreas(param);
		return resList;
	}
);

const subAreasListSlice = createSlice({
	name: nameSpace,
	initialState: { loading: false, data: [] },
	extraReducers: {
		[fetchSubAreaList.pending](state) {
			state.loading = false;
			state.data = [];
		},

		[fetchSubAreaList.fulfilled](state, { payload }) {
			state.loading = true;
			state.data = Parser.createOptionObj(
				payload && payload.childAreas ? payload.childAreas : []
			);
		},
		[fetchSubAreaList.rejected](state) {
			state.loading = false;
			state.data = [];
		},
	},
});

export default subAreasListSlice.reducer;
