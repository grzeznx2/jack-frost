import { FlavorId } from 'src/app/features/flavor/flavor.model';
import { AppState } from '../app.state';

export const selectFlavors = (state: AppState) => state.flavors;
export const selectFlavorById = (id: FlavorId) => (state: AppState) =>
  state.flavors.byIds[id];
export const selectFlavorsLoading = (state: AppState) => state.flavors.loading;
export const selectFlavorsError = (state: AppState) => state.flavors.error;
export const selectFlavorsList = (state: AppState) => {
  const { idList, byIds } = state.flavors;
  return idList.map((id) => byIds[id]);
};
