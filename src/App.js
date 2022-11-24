import React, { useState, useEffect } from 'react';
import './App.css';
import Table from './Components/Table';
import MainContextProvider from './context/MainContextProvider';
import getInfoPlanets from './services/getInfoPlanets';

function App() {
  const [dataPlanets, setDataPlenets] = useState([]);

  useEffect(() => {
    getInfoPlanets()
      .then((res) => res.filter((item) => delete item.residents))
      .then((ok) => setDataPlenets(ok));
    console.log(dataPlanets);
  }, []);
  return (
    <MainContextProvider.Provider value={ dataPlanets }>
      <Table />
    </MainContextProvider.Provider>
  );
}

export default App;
