export interface AllCountries {
  name: string;
  alpha3Code: string;
}

export interface AllCountriesAPI {
  name: string;
  alpha3Code: string;
  independent: boolean;
}

export interface APICountryCode {
  name: string;
  flag: string;
  capital: string;
  population: number;
  borders: AllCountries[];
}
