import React, { useState } from 'react';
import axios from 'axios';

const PesquisaCep = () => {
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://viacep.com.br/ws/${cep}/json/`);
      setAddress(response.data);
      setError(null);
    } catch (error) {
      setAddress(null);
      setError('CEP não encontrado.');
    }
  };

  return (
    <div>
      <h2>Pesquisar CEP</h2>
      <input
        type="text"
        value={cep}
        onChange={(e) => setCep(e.target.value)}
        placeholder="Digite o CEP"
      />
      <button onClick={handleSearch}>Pesquisar</button>

      {error && <p>{error}</p>}

      {address && (
        <div>
          <h3>Resultado:</h3>
          <p>CEP: {address.cep}</p>
          <p>Logradouro: {address.logradouro}</p>
          <p>Bairro: {address.bairro}</p>
          <p>Cidade: {address.localidade}</p>
          <p>Estado: {address.uf}</p>
        </div>
      )}
    </div>
  );
};

export default PesquisaCep;
