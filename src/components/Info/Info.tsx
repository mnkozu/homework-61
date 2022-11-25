import React, {useCallback, useEffect, useState} from 'react';
import axios from "axios";
import {AllCountries, APICountryCode} from "../../types";
import './Info.css';

interface Props {
  clickedCountry: string | null;
}

const code_URL = "https://restcountries.com/v2/alpha/";

const Info: React.FC<Props> = ({clickedCountry}) => {
  const [country, setCountry] = useState<APICountryCode | null>(null);

  let bordersTSX;

  const fetchData = useCallback(async (code: string) => {
    const response = await axios.get<APICountryCode>(code_URL + code);
    const countryD = response.data;

    const bordersCountry = response.data.borders;

     if (bordersCountry) {
       const borders: AllCountries[] = [];
       for (const border of bordersCountry) {
         const borderCountryResponse = await axios.get<AllCountries>(code_URL + border);
         const borderCountry = {
           name: borderCountryResponse.data.name,
           alpha3Code: borderCountryResponse.data.alpha3Code
         };
         borders.push(borderCountry);
       }
       const countryInfo: APICountryCode = {
         name: countryD.name,
         capital: countryD.capital,
         flag: countryD.flag,
         population: countryD.population,
         borders: borders,
       };
       setCountry(countryInfo);
       bordersTSX = (
         <div>
           <h5>Borders with: </h5>
           <ol>
             {country?.borders.map(country => (
               <li key={country.alpha3Code}>{country.name}</li>
             ))}
           </ol>
         </div>
       );
     } else {
       const borders: AllCountries[] = [];
       const countryInfo = {
         name: countryD.name,
         capital: countryD.capital,
         flag: countryD.flag,
         population: countryD.population,
         borders: borders,
       };
       setCountry(countryInfo);
       bordersTSX = (
         <div>Borders no!</div>
       );
     }
     }, []);


   useEffect(() => {
     if (clickedCountry !== null) {
       fetchData(clickedCountry).catch(console.error);
     }
   }, [clickedCountry, fetchData]);

   let info;

    if (clickedCountry) {
      info = (
      <div className="Info">
        <h4>Country name: {country?.name}</h4>
        <p>Capital : {country?.capital} </p>
        <p>Population: {country?.population} </p>
        <img className="image" src={country?.flag} alt={country?.name}/>
        {bordersTSX}
      </div>);
    } else {
      info = (
        <div className="Info">Choose Country</div>
      );
    }

  return info;
};

export default Info;