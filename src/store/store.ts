import { combineReducers, configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';

import formReducer from '../pages/Form/formReducer';
import searchInputReducer from '../layouts/SearchBar/searchInputReducer';
// import searchSubmitReducer from '../layouts/SearchBar/searchSubmitReducer';
import apiGetDataReducer from '../layouts/SearchBar/seatchData';

const rootReducer = combineReducers({
  form: formReducer,
  searchInput: searchInputReducer,
  apiData: apiGetDataReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
