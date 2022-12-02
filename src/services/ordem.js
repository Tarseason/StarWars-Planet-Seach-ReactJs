const ordenaMesmo = (arr, baseOrder) => {
  const aa = arr.filter((item) => item[baseOrder.order.column] !== 'unknown');
  const bb = arr.filter((item) => item[baseOrder.order.column] === 'unknown');

  if (baseOrder.order.sort === 'ASC') {
    aa.sort((a, b) => a[baseOrder.order.column] - b[baseOrder.order.column]);
  } else {
    aa.sort((a, b) => b[baseOrder.order.column] - a[baseOrder.order.column]);
  }

  return [...aa, ...bb];
};

export default ordenaMesmo;
