import React from 'react';
import './Pokecard.css';

const image_URL = 'https://raw.githubusercontent.com/' +
  'PokeAPI/sprites/master/sprites/pokemon/';


/** Individual Pokemon card. */

const Pokecard = (props) => {
  let imgSrc = `${image_URL}${props.id}.png`;

  return (
      <div className="Pokecard">
        <div className="Pokecard-title">{ props.name }</div>
        <img className="Pokecard-image" src={imgSrc} />
        <div className="Pokecard-data">Type: {props.type}</div>
        <div className="Pokecard-data">EXP: {props.exp}</div>
      </div>
  );
}

export default Pokecard;
