const filterSearch2 = (dataFilter, filterView) => {
  let arr = dataFilter;
  filterView.forEach((element) => {
    const filtering = arr.filter((ele) => {
      if (element.comparacao === 'maior que') {
        return +ele[element.column] > +element.valor
    && ele[element.column] !== 'unknown';
      }
      if (element.comparacao === 'menor que') {
        return +ele[element.column] < +element.valor
    && ele[element.column] !== 'unknown';
      }
      if (element.comparacao === 'igual a') {
        return +ele[element.column] === +element.valor
    && ele[element.column] !== 'unknown';
      }
      return false;
    });

    arr = filtering;
  });
  return arr;
};

export default filterSearch2;
