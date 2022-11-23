const getInfoPlanets = () => {
  const request = fetch('https://swapi.dev/api/planets')
    .then((res) => res.json())
    .then((data) => data.results)
    .catch((error) => console.error(error));

  return request;
};

export default getInfoPlanets;
