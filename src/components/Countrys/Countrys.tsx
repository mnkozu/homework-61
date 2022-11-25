import React from 'react';
import {AllCountry} from "../../types";

interface Props {
  allCountry: AllCountry[];
}

const Countrys: React.FC<Props> = ({allCountry}) => {
  return (
    <div>
      {allCountry.map(country => (
        <div key={country.alpha3Code}>{country.name} {country.alpha3Code}</div>
      ))}
    </div>
  );
};

export default Countrys;