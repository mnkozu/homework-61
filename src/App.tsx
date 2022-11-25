import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import {AllCountry, AllCountryAPI} from "./types";
import axios from "axios";
import Countrys from "./components/Countrys/Countrys";

const url = "https://restcountries.com/v2/all?fields=alpha3Code,name";

function App() {
  const [allCountry, setAllCountry] = useState<AllCountry[]>([]);

  const fetchData = useCallback(async()=> {
    const response = await axios.get<AllCountryAPI[]>(url);

    const promises = response.data.map(async country => {
      return {
        alpha3Code: country.alpha3Code,
        name: country.name,
      };
    });

    const allCountryList = await Promise.all(promises);
    setAllCountry(allCountryList);
  }, []);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);

  return (
    <div className="App">
      <Countrys allCountry={allCountry}/>
    </div>
  );
}

export default App;
