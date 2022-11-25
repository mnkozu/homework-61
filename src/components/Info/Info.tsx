import React from 'react';
import './Info.css';

const Info = () => {
  return (
    <div className="Info">
      <h4>Country name: </h4>
      <p>Capital : </p>
      <p>Population: </p>
      {/*<img src={country.flag} alt={country.alpha3Code}/>*/}
      <div>
        <p>Borders with: </p>
        <ol>
          <li>borders with</li>
        </ol>
      </div>
    </div>
  );
};

export default Info;