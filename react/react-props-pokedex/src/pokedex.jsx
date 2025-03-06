import React from "react";
import Pokecard from "./pokecard.jsx";
import "./Pokedex.css";

const Pokedex = ({pokemon}) => {

  console.log(pokemon);

  return (
    <div className="Pokedex">
      <h2 className="Pokedex-title">Pokedex</h2>
      <div className="Pokedex-cards">
        {pokemon.map(p => (
          <Pokecard
            id={p.id}
            name={p.name}
            type={p.type}
            exp={p.base_experience}
          />
        ))}
      </div>
    </div>
  );
}


export default Pokedex;
