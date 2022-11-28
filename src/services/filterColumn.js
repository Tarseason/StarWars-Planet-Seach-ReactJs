const filterSearch = (data, columnFilter) => {
  const base = data;
  const compare = columnFilter;
  if (compare.comparacao === 'maior que') {
    const baseFiltered = base.filter((item) => +item[compare.column] > +compare.valor
    && item[compare.column] !== 'unknown');
    return baseFiltered;
  }
  if (compare.comparacao === 'menor que') {
    const baseFiltered = base.filter((item) => +item[compare.column] < +compare.valor
    && item[compare.column] >= 0);
    return baseFiltered;
  }
  if (compare.comparacao === 'igual a') {
    const baseFiltered = base
      .filter((item) => +item[compare.column] === +compare.valor);
    return baseFiltered;
  }
};

export default filterSearch;
