const controlFilters = (filterView) => {
  const arrayInfo = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water'];
  const result = arrayInfo[filterView.length - 1];
  return result;
};

export default controlFilters;
