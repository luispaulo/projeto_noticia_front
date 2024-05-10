import './App.css';
import PesquisaCep from './components/pesquisaCep';
import NoticiaCrud from './components/noticiaCrud';
import React, { useState } from 'react';

function App() {

  const [activeComponent, setActiveComponent] = useState(null);

  const handleClick = (component) => {
    setActiveComponent(component);
  };
  
  return (
    <div className="App">
      <div className="menu">
        <button onClick={() => handleClick('PesquisaCep')}>Pesquisar CEP</button>
        <button onClick={() => handleClick('NoticiaCrud')}>Gerenciar Notícias</button>
      </div>
      <div className="container">
        {activeComponent === 'PesquisaCep' && <PesquisaCep />}
        {activeComponent === 'NoticiaCrud' && <NoticiaCrud />}
      </div>
    </div>
  );
}

export default App;
