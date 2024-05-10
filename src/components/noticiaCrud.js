import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './meuEstiloCrud.css';

const NoticiaCrud = () => {
  const [noticias, setNoticias] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
    //   const response = await axios.get('http://localhost:3001/noticias');
      const response = await axios.get('http://localhost:8001/api/noticias');
      setNoticias(response.data);
    } catch (error) {
      console.error('Erro ao buscar notícias:', error);
    }
  };

  const handleCreate = async () => {
    try {
      const response = await axios.post('http://localhost:8001/api/noticias', { titulo, descricao });
      setNoticias([...noticias, response.data]);
      setTitulo('');
      setDescricao('');
    } catch (error) {
      console.error('Erro ao criar notícia:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8001/api/noticias/${id}`);
      const updatedNoticias = noticias.filter(noticia => noticia.id !== id);
      setNoticias(updatedNoticias);
    } catch (error) {
      console.error('Erro ao excluir notícia:', error);
    }
  };

  return (
    
    <div className="container">
        <div className="row">
            <div className="column">
                <h2>Criar Notícia</h2>
                <div className="input-container">
                <label htmlFor="titulo">Título:</label>
                <input
                    type="text"
                    id="titulo"
                    placeholder="Título"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    className="small-input"
                />
                </div>
                <div className="input-container">
                <label htmlFor="descricao">Descrição:</label>
                <textarea
                    id="descricao"
                    placeholder="Descrição"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    className="small-input"
                ></textarea>
                </div>
                <button onClick={handleCreate}>Criar</button>
            </div>
        </div>
        <div className="row">
        <table className="columnResult">
            <thead>
                <tr>
                <th>Título</th>
                <th>Descrição</th>
                <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {noticias.map(noticia => (
                <tr key={noticia.id}>
                    <td>{noticia.titulo}</td>
                    <td>{noticia.descricao}</td>
                    <td>
                    <button onClick={() => handleDelete(noticia.id)}>Excluir</button>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
</div>

    </div>
  );
};

export default NoticiaCrud;
