import React, { useContext, useEffect, useState } from 'react';
import MainContextProvider from '../context/MainContextProvider';

function Table() {
  const dataPlanets = useContext(MainContextProvider);
  const [planetsFull, setPlanetsFull] = useState([]);

  const [planets, setPlanets] = useState([]);
  const [planetsShow, setPlanetsShow] = useState([]);
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    setPlanetsFull(dataPlanets);
    if (planetsFull.length > 0) {
      setPlanets(planetsFull);
    }

    if (searchName.length > 0) {
      const a = planets.filter((item) => item.name.includes(searchName));
      // descobrir como quebrar o case sensitivi!
      setPlanetsShow(a);
    } else {
      setPlanetsShow(planets);
    }
    console.log('aloMesmo', planets);
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
