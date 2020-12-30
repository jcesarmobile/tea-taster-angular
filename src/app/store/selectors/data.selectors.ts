import { createSelector, createFeatureSelector } from '@ngrx/store';
import { DataState } from '@app/store/reducers/data/data.reducer';
import { Tea } from '@app/models';

export const selectData = createFeatureSelector('data');
export const selectTeas = createSelector(
  selectData,
  (state: DataState) => state.teas,
);
export const selectTea = createSelector(
  selectTeas,
  (teas: Array<Tea>, props: { id: number }) =>
    teas.find(t => t.id === props.id),
);
