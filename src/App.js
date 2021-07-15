import './App.css';
import {useState,useEffect} from 'react';
import axios from "axios";
import pokedex from "./pokedex.png"


//Grado III

const Tarjeta=({pokemonFiltrado})=>{
  return(
    <div>
    {pokemonFiltrado.map((value)=>{
      return(
        <div className="tarjetas" key={value.name}>
            <img alt='' className="pokemon" src={value.sprites.front_default}/>
        </div>
      )
    })}
  </div>
  )
}

//Grado II

const SearchBox=({onSearch})=>{
  const [pokeInput, setPokeInput]=useState("");
//formulario de busqueda
  return(
    <div>
          <input value={pokeInput} 
            onChange={({ target: { value }}) => setPokeInput(value)}
            className="search-box-input"/>
        <button onClick={() => onSearch(pokeInput)} 
                disabled={!pokeInput.length}
                className="search-box-button"
                ></button>
    </div>
  )
}


//Grado I
const Search = () => {
  const [pokemon, setPokemon]=useState([]);
  const [pokemonFiltrado, setPokemonFiltrado]=useState([]);
//consumo de una Api anidada
  const CargarDatos=()=>{
    axios.get("https://pokeapi.co/api/v2/pokemon")
      .then(res=>{ for (let i = 0; i < res.data.results.length; i++) {
                        axios.get(res.data.results[i].url)
                          .then(result=>{
                            setPokemon(aregloPrevio=>[...aregloPrevio, result.data])}
                          )
                        } 
                    }         
              )
};

  useEffect(CargarDatos,[]);

  const handleSearchClick = (pokeInput) => {
    if (pokemon?.length) {
      const searchTextMinus = pokeInput.toLowerCase();
      const filteredData = pokemon.filter((value) => (
          value.name.toLowerCase().includes(searchTextMinus) 
        )
      );
      setPokemonFiltrado(filteredData);
    }
  };

  return(
    <div>
      <SearchBox onSearch={handleSearchClick} />
      <Tarjeta
          pokemonFiltrado={pokemonFiltrado}
        />
    </div>
  )
}





// Padre
function App(){
  return(
    <div>
      <img src={pokedex} alt="" className="pokedex" />
      <Search/>
    </div>
  );
}


export default App;