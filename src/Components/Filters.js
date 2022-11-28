import React, { useState, useContext, useEffect } from 'react';
import MainContextProvider from '../context/MainContextProvider';
import ToFilter from '../context/ToFilter';
import ShowTable from './ShowTable';
import filterSearch2 from '../services/filterSearch2';

const numDisable = 5;
const arrayInfo = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water'];
function Filters() {
  const data = useContext(MainContextProvider);
  const [mainShow, setMainShow] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [filterView, setFilterView] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [columFilter, setColumFilter] = useState(
    { column: 'population', comparacao: 'maior que', valor: 0 },
  );

  useEffect(() => {
    setDataFilter(data);
  }, [data]);

  useEffect(() => {
    if (searchName.length > 0) {
      const a = dataFilter.filter((item) => item.name.includes(searchName));
      setMainShow(a);
    } else {
      setMainShow(dataFilter);
    }
  }, [dataFilter, searchName]);

  useEffect(() => {
    if (filterView.length === 0) {
      setColumFilter({
        column: arrayInfo[filterView.length],
        comparacao: 'maior que',
        valor: 0,
      });
    }
    if (filterView.length > 0) {
      setColumFilter({ column: arrayInfo[filterView.length],
        comparacao: 'maior que',
        valor: 0 });
    }
  }, [filterView, mainShow]);

  const filterWithColumn = () => {
    const a = filterSearch2(mainShow, filterView);
    setMainShow(a);
  };

  const setaInfoFilterview = () => {
    setFilterView((prev) => {
      const all = [
        ...prev,
        { column: columFilter.column,
          comparacao: columFilter.comparacao,
          valor: columFilter.valor },
      ];

      setMainShow(filterSearch2(mainShow, all));
      return all;
    });
  };

  const deleteFilter = ({ target }) => {
    const filterNew = filterView.filter((it) => it.column !== target.name);
    setFilterView(filterNew);
    const a = filterSearch2(dataFilter, filterNew);
    setMainShow(a);
  };

  const handleChange = ({ target }) => {
    setColumFilter((prev) => ({ ...prev, [target.name]: target.value }));
  };

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
      <select
        data-testid="column-filter"
        name="column"
        id="column-filter"
        onChange={ handleChange }
        value={ columFilter.column }
      >
        {!filterView.some((it) => it.column === 'population') && (
          <option
            name="column"
            id="column-filter"
            value="population"
            onClick={ (e) => e.target.name }
          >
            population
          </option>
        )}
        {!filterView.some((it) => it.column === 'orbital_period') && (
          <option
            id="column-filter"
            name="column"
            value="orbital_period"
          >
            orbital_period
          </option>
        )}

        {!filterView.some((it) => it.column === 'diameter') && (
          <option
            id="column-filter"
            name="column"
            value="diameter"
          >
            diameter
          </option>
        )}
        {!filterView.some((it) => it.column === 'rotation_period') && (
          <option
            id="column-filter"
            name="column"
            value="rotation_period"
          >
            rotation_period
          </option>
        )}
        {!filterView.some((it) => it.column === 'surface_water') && (
          <option
            id="column-filter"
            name="column"
            value="surface_water"
          >
            surface_water
          </option>
        )}
      </select>
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
      <input
        data-testid="value-filter"
        name="valor"
        id="valor"
        onChange={ handleChange }
        value={ columFilter.valor }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => {
          filterWithColumn();
          setaInfoFilterview();
        } }
        disabled={ filterView.length === numDisable }
      >
        Filtrar
      </button>
      <div>
        {filterView.map((item, index) => (
          <div key={ index } data-testid="filter">
            <p>
              {`${item.column}${item.comparacao}${item.valor}`}
            </p>
            <button
              type="button"
              id={ index }
              name={ item.column }
              onClick={ (e) => { deleteFilter(e); } }
            >
              X
            </button>
          </div>
        ))}
      </div>
      <button
        data-testid="button-remove-filters"
        type="button"
        onClick={ () => { setFilterView([]); setMainShow(dataFilter); } }
      >
        Remover todas filtragens
      </button>
      <ToFilter.Provider value={ mainShow }>
        <ShowTable />
      </ToFilter.Provider>
    </div>
  );
}

export default Filters;
