import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { Entity } from './types';
import { RootState } from '..';

const entityAdapter = createEntityAdapter<Entity>({
  selectId: (item) => item.id,
});

const slice = createSlice({
  name: 'entities',
  initialState: entityAdapter.getInitialState(),
  reducers: {},
});

export const { selectAll: selectAllEntities, selectIds: selectEntitiyIds } =
  entityAdapter.getSelectors<RootState>((state) => state.entities);

export default slice.reducer;
