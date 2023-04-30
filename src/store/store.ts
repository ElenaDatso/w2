import { configureStore } from '@reduxjs/toolkit';
import formReducer from '../pages/Form/formReducer';
import searchInputReducer from '../layouts/SearchBar/searchInputReducer';
// import searchSubmitReducer from '../layouts/SearchBar/searchSubmitReducer';
import apiGetDataReducer from '../layouts/SearchBar/seatchData';

const store = configureStore({
  reducer: {
    form: formReducer,
    searchInput: searchInputReducer,
    // searchSubmit: searchSubmitReducer,
    apiData: apiGetDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
