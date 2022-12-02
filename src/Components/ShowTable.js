import React, { useState, useEffect, useContext } from 'react';
import ToFilter from '../context/ToFilter';
import ordenaMesmo from '../services/ordem';

function ShowTable() {
  const newData = useContext(ToFilter);
  const [planetsShow, setPlanetsShow] = useState([]);
  const [order, setOrder] = useState(
    { order: { column: '', sort: '' } },
  );

  const [columnSame, setColumnSame] = useState('population');
  const [orderSame, setOrderSame] = useState('ASC');
  const [ordenado, setOrdenado] = useState([]);

  useEffect(() => {
    setPlanetsShow(newData);
    if (ordenado.length > 0) {
      setPlanetsShow(ordenado);
    }

    setOrder({
      order: {
        column: columnSame,
        sort: orderSame,
      },
    });
  }, [newData, columnSame, orderSame, planetsShow, ordenado]);

  const orderNow = () => {
    const a = ordenaMesmo(planetsShow, order);
    setOrdenado(a);
  };

  return (
    <div>
      <div>
        <select
          data-testid="column-sort"
          name="column"
          id="order"
          value={ columnSame }
          onChange={ (e) => setColumnSame(e.target.value) }
        >
          <option
            name="order"
            id="order-filter"
            value="population"
          >
            population
          </option>
          <option
            name="order"
            id="order-filter"
            value="orbital_period"
          >
            orbital_period
          </option>
          <option
            name="order"
            id="order-filter"
            value="diameter"
          >
            diameter
          </option>
          <option
            name="order"
            id="order-filter"
            value="rotation_period"
          >
            rotation_period
          </option>
          <option
            name="order"
            id="order-filter"
            value="surface_water"
          >
            surface_water
          </option>
        </select>

        <label htmlFor="ASC">
          <input
            checked={ orderSame === 'ASC' }
            type="radio"
            name="sort"
            id="ASC"
            value="ASC"
            onChange={ () => setOrderSame('ASC') }
            data-testid="column-sort-input-asc"
          />
          Ascendente
        </label>
        <label htmlFor="DESC">
          <input
            checked={ orderSame === 'DESC' }
            type="radio"
            name="sort"
            id="DESC"
            value="DESC"
            onChange={ () => setOrderSame('DESC') }
            data-testid="column-sort-input-desc"
          />
          Descendente
        </label>

        <button
          type="button"
          onClick={ () => orderNow() }
          data-testid="column-sort-button"
        >
          Ordenar
        </button>

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
            planetsShow?.map((item) => (
              <tr key={ item.created }>
                <td
                  data-testid="planet-name"
                >
                  {item.name}
                </td>
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

export default ShowTable;
