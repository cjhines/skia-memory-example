import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SliceState } from './types';
import { RootState } from '..';

const initialState: SliceState = {
  token: '',
};

const slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    setToken(state, { payload }: PayloadAction<string>) {
      state.token = payload;
    },
  },
});

export const { setToken } = slice.actions;

export const selectToken = (state: RootState) => state.slice.token;

export default slice.reducer;
