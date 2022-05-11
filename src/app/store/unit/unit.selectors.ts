import { UnitId } from 'src/app/features/unit/unit.model';
import { AppState } from '../app.state';

export const selectUnits = (state: AppState) => state.units;
export const selectUnitById = (id: UnitId) => (state: AppState) =>
  state.units.byIds[id];
export const selectUnitsLoading = (state: AppState) => state.units.loading;
export const selectUnitsError = (state: AppState) => state.units.error;
export const selectUnitsList = (state: AppState) => {
  const { idList, byIds } = state.units;
  return idList.map((id) => byIds[id]);
};
export const selectDeleteUnitLoading = (id: UnitId) => (state: AppState) => {
  console.log(state.units.loading);
  return state.units.loading.delete[id];
};
