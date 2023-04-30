import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import PhotoData from '../../interfaces/PhotoData';

const API_KEY = 'ad3ad555dd3292925321ec36efca1184';
const BASE_URL = 'https://api.flickr.com/services/rest/';

export const fetchSeachSubmit = createAsyncThunk(
  'searchValue/getData',
  async (searchVal: string) => {
    const response = await axios.get<{ photos: { photo: PhotoData[] } }>(
      `${BASE_URL}?method=flickr.photos.search&api_key=${API_KEY}&text=${searchVal}&format=json&nojsoncallback=1`
    );
    return response.data;
  }
);

const initialState: {
  dataArray: PhotoData[];
  loading: boolean;
} = {
  dataArray: [],
  loading: false,
};

const apiGetDataReducer = createSlice({
  name: 'searchValue',
  initialState,
  reducers: {
    toggleLoader: (state) => {
      state.loading = !state.loading;
    },
    removeData: (state) => {
      state.dataArray.length = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSeachSubmit.fulfilled, (state, action) => {
      state.dataArray = action.payload.photos.photo;
    });
  },
});

export const { toggleLoader, removeData } = apiGetDataReducer.actions;
export default apiGetDataReducer.reducer;
