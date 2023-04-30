import { createSlice } from '@reduxjs/toolkit';

const searchInputSlice = createSlice({
  name: 'searchInput',
  initialState: '',
  reducers: {
    save: (state, action) => {
      state = action.payload || '';
      return state;
    },
  },
});

export const { save } = searchInputSlice.actions;
export default searchInputSlice.reducer;
