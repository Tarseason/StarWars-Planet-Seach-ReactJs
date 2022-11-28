import React, { useState, useEffect } from 'react';
import './App.css';
import Main from './Components/Main';
import MainContextProvider from './context/MainContextProvider';
import getInfoPlanets from './services/getInfoPlanets';

function App() {
  const [dataPlanets, setDataPlenets] = useState([]);

  useEffect(() => {
    getInfoPlanets()
      .then((res) => res.filter((item) => delete item.residents))
      .then((ok) => setDataPlenets(ok));
  }, []);

  return (
    <MainContextProvider.Provider value={ dataPlanets }>
      <Main />
    </MainContextProvider.Provider>
  );
}

export default App;
