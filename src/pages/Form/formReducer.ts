import { createSlice } from '@reduxjs/toolkit';
import BookFormData from '../../interfaces/BookFormData';

const initialState: BookFormData[] = [];

const formSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    push: (state, action) => {
      state.push(action.payload);
      console.log(state);
    },
  },
});

export const { push } = formSlice.actions;
export default formSlice.reducer;
