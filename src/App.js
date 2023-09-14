import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import './App.css'
import api from './services/api'

function App() {
  const [input, setInput] = useState('');
  const [endereco, setEndereco] = useState({});

  async function handleSearch() {
    if (!input){
      alert("Preencha um CEP")
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setEndereco(response.data);
      setInput("")
    } catch (error) {
      alert("Ops erro ao buscar endereço");
      setInput('');
      setEndereco({});
    }
    
  }
  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input 
        type="text"
        placeholder="Digite seu cep..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        />
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF"/>
        </button>
      </div>

      {Object.keys(endereco).length > 0 && (
        <main className="main">
        <h2>CEP: {endereco.cep}</h2>

        <span>{endereco.logradouro}</span>
        <span>Complemento: {endereco.complemento}</span>
        <span>{endereco.bairro}</span>
        <span>{endereco.localidade} - {endereco.uf}</span>
        </main>
      )}
      
    </div>
  );
}

export default App;
