import {
	configureStore,
	combineReducers,
	getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import areasListSlice from '../actions/areaListAction';
import subAreasListSlice from '../actions/subAreaAction';
import playersListSlice from '../actions/playersListAction';
import competitionsSlice from '../actions/competitionsAction';
import matchesSlice from '../actions/matchesAction';
import userStateSlice from '../actions/authAction';
import playerDataSlice from '../actions/playerDataAction';
import teamFormedSlice from '../actions/teamFormedAction';

const persistConfig = {
	key: 'teamsList',
	storage,
	whiteList: ['teamsList'],
};

const rootReducer = combineReducers({
	areasList: areasListSlice,
	subAreasList: subAreasListSlice,
	playersList: playersListSlice,
	competitions: competitionsSlice,
	matches: matchesSlice,
	userInfo: userStateSlice,
	playerInfo: playerDataSlice,
	teamsList: persistReducer(persistConfig, teamFormedSlice), // this is persisted state
});

// TODO: const persistReducerConfig = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

const persistor = persistStore(store);

export { persistor };
export default store;
