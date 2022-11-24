import React, { useContext, useEffect, useState } from 'react';
import MainContextProvider from '../context/MainContextProvider';

function Table() {
  const dataPlanets = useContext(MainContextProvider);

  const [planetsFull, setPlanetsFull] = useState([]);

  const [planets, setPlanets] = useState([]);
  const [planetsShow, setPlanetsShow] = useState([]);

  const [searchName, setSearchName] = useState('');

  const [columFilter, setColumFilter] = useState({
    column: 'population',
    comparacao: 'maior que',
    valor: Number(0),
  });
  const [filterView, setFilterView] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setColumFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filterSearch = () => {
    const base = planetsShow;
    const compare = columFilter;
    if (compare.comparacao === 'maior que') {
      const baseFiltered = base.filter((item) => +item[compare.column] > +compare.valor
      && item[compare.column] !== 'unknown');
      setPlanetsShow(baseFiltered);
    }
    if (compare.comparacao === 'menor que') {
      const baseFiltered = base.filter((item) => +item[compare.column] < +compare.valor
      && item[compare.column] >= 0);
      setPlanetsShow(baseFiltered);
    }
    if (compare.comparacao === 'igual a') {
      const baseFiltered = base
        .filter((item) => +item[compare.column] === +compare.valor);
      setPlanetsShow(baseFiltered);
    }

    setFilterView((prev) => ([
      ...prev,
      {
        column: columFilter.column,
        camparacao: columFilter.comparacao,
        valor: columFilter.valor,
      },
    ]));
  };

  useEffect(() => {
    setPlanetsFull(dataPlanets);
    if (planetsFull.length > 0) {
      setPlanets(planetsFull);
    }

    console.log(dataPlanets);

    if (searchName.length > 0) {
      const a = planets.filter((item) => item.name.includes(searchName));
      // descobrir como quebrar o case sensitivi!
      setPlanetsShow(a);
    } else {
      setPlanetsShow(planets);
    }
  }, [dataPlanets, planetsFull, searchName, planets]);

  return (
    <div>
      <div>
        <input
          value={ searchName }
          placeholder="Pesquisar"
          type="text"
          data-testid="name-filter"
          onChange={ ({ target }) => setSearchName(target.value) }
        />
      </div>

      <div>
        <select
          data-testid="column-filter"
          name="column"
          id="column-filter"
          onChange={ handleChange }
          value={ columFilter.column }
        >
          <option
            name="column"
            id="column-filter"
            value="population"
          >
            population
          </option>
          <option
            id="column-filter"
            name="column"
            value="orbital_period"
          >
            orbital_period
          </option>
          <option
            id="column-filter"
            name="column"
            value="diameter"
          >
            diameter
          </option>
          <option
            id="column-filter"
            name="column"
            value="rotation_period"
          >
            rotation_period
          </option>
          <option
            id="column-filter"
            name="column"
            value="surface_water"
          >
            surface_water
          </option>
        </select>
      </div>

      <div>
        <select
          name="comparacao"
          id="comparacao"
          data-testid="comparison-filter"
          onChange={ handleChange }
          value={ columFilter.comparacao }
        >
          <option
            name="comparacao"
            id="comparacao"
            value="maior que"
          >
            maior que
          </option>

          <option
            name="comparacao"
            id="comparacao"
            value="menor que"
          >
            menor que
          </option>

          <option
            name="comparacao"
            id="comparacao"
            value="igual a"
          >
            igual a
          </option>

        </select>
      </div>

      <div>
        <input
          data-testid="value-filter"
          name="valor"
          id="valor"
          onChange={ handleChange }
          value={ Number(columFilter.valor) }
        />
      </div>

      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => filterSearch() }
      >
        Filtrar
      </button>

      <div>
        {
          filterView.map((item) => (
            <div key={ item.valor }>
              <p>
                {`${item.column}${item.comparacao}${item.valor}`}
                <button
                  type="button"
                >
                  X
                </button>
              </p>
            </div>
          ))
        }
      </div>
      <table>

        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>

        <tbody>
          {

            planetsShow.map((item) => (
              <tr key={ item.created }>
                <td>{item.name}</td>
                <td>{item.rotation_period}</td>
                <td>{item.orbital_period}</td>
                <td>{item.diameter}</td>
                <td>{item.climate}</td>
                <td>{item.gravity}</td>
                <td>{item.terrain}</td>
                <td>{item.surface_water}</td>
                <td>{item.population}</td>
                <td>{item.films}</td>
                <td>{item.created}</td>
                <td>{item.edited}</td>
                <td>{item.url}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
