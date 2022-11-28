import React, { useState, useEffect, useContext } from 'react';
import ToFilter from '../context/ToFilter';

function ShowTable() {
  const newData = useContext(ToFilter);
  const [planetsShow, setPlanetsShow] = useState([]);

  useEffect(() => {
    setPlanetsShow(newData);
  }, [newData]);

  // setFilterView((prev) => ([
  //   ...prev,
  //   {
  //     column: columFilter.column,
  //     camparacao: columFilter.comparacao,
  //     valor: columFilter.valor,
  //   },
  // ]));

  return (
    <div>

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

export default ShowTable;
