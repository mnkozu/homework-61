import React, {useCallback, useEffect, useState} from 'react';
import {AllCountries, AllCountriesAPI} from "./types";
import axios from "axios";
import Info from "./components/Info/Info";
import Country from "./components/Country/Country";

const url = "https://restcountries.com/v2/all?fields=alpha3Code,name";

function App() {
  const [allCountries, setAllCountries] = useState<AllCountries[]>([]);
  const [clickedCountry, setClickedCountry] = useState<string | null>(null);

  const fetchData = useCallback(async()=> {
    const response = await axios.get<AllCountriesAPI[]>(url);

    const promises = response.data.map(async country => {
      return {
        alpha3Code: country.alpha3Code,
        name: country.name,
      };
    });

    const allCountriesList = await Promise.all(promises);
    setAllCountries(allCountriesList);
  }, []);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);


  console.log(clickedCountry);

  return (
    <div className="container d-flex justify-content-around">
      <div className="Countries">
        {allCountries.map(country => (
          <Country
            key={country.alpha3Code}
            name={country.name}
            onClick={() => setClickedCountry(country.alpha3Code)}
          />
        ))}
      </div>
      {clickedCountry ? <Info/> : <div>Choose country to get info</div> }
    </div>
  );
}

export default App;
