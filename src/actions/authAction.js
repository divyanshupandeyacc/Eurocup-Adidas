import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getSession, removeSession, setSession } from '../api/common-services';
import Parser from '../utils/parser';

const nameSpace = 'auth';

// fetch action to get user state
export const fetchUserState = createAsyncThunk(
	`${nameSpace}/fetchUserState`,
	async (param, thunkAPI) => {
		const resList = await getSession();
		return resList;
	}
);

export const signInUser = createAsyncThunk(
	`${nameSpace}/signInUser`,
	async (param, thunkAPI) => {
		const resList = await setSession();
		return resList;
	}
);

export const signOutUser = createAsyncThunk(
	`${nameSpace}/signOutUser`,
	async (param, thunkAPI) => {
		const resList = await removeSession();
		return resList;
	}
);

const userStateSlice = createSlice({
	name: nameSpace,
	initialState: { loading: false, data: false },
	extraReducers: {
		[fetchUserState.pending](state) {
			state.loading = false;
			state.data = false;
		},
		[fetchUserState.fulfilled](state, { payload }) {
			state.loading = true;
			state.data = payload;
		},
		[fetchUserState.rejected](state) {
			state.loading = false;
			state.data = false;
		},
		[signOutUser.pending](state) {
			state.loading = false;
			state.data = false;
		},

		[signOutUser.fulfilled](state, { payload }) {
			state.loading = true;
			state.data = payload;
		},
		[signOutUser.rejected](state) {
			state.loading = false;
			state.data = false;
		},
		[signInUser.pending](state) {
			state.loading = false;
			state.data = false;
		},

		[signInUser.fulfilled](state, { payload }) {
			state.loading = true;
			state.data = payload;
		},
		[signInUser.rejected](state) {
			state.loading = false;
			state.data = false;
		},
	},
});

export default userStateSlice.reducer;
