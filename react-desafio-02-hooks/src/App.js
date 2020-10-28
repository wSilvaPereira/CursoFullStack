import React, { useEffect, useState } from 'react';
import Countries from './components/countries/Countries';
import Header from './components/header/Header';

export default function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filteredPopulation, setFilteredPopulation] = useState(0);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      const res = await fetch('https://restcountries.eu/rest/v2/all');
      const json = await res.json();

      const allCountries = json.map(
        ({ numericCode, flag, population, translations, name }) => {
          return {
            id: numericCode,
            name,
            filterName: name.toLowerCase(),
            flag,
            population,
            translatedName: translations.br,
          };
        }
      );

      setAllCountries(allCountries);
      setFilteredCountries(Object.assign([], allCountries));
      setFilteredPopulation(getTotalPopulation(allCountries));
    };
    fetchCountries();
  }, []);

  const getTotalPopulation = (filteredCountries) => {
    const count = filteredCountries.reduce((accumulator, current) => {
      return accumulator + current.population;
    }, 0);
    return count;
  };

  const handleChangeFilter = (newText) => {
    const filterLowerCase = newText.toLowerCase();

    const filteredCountriesAux = allCountries.filter((country) => {
      const { filterName } = country;
      return filterName.includes(filterLowerCase);
    });

    setFilter(newText);
    setFilteredCountries(filteredCountriesAux);
    setFilteredPopulation(getTotalPopulation(filteredCountriesAux));
  };

  return (
    <div className="container">
      <h1 style={styles.centeredTitle}>React Countries</h1>
      <Header
        filter={filter}
        countryCount={filteredCountries.length}
        totalPopulation={filteredPopulation}
        onChangeFilter={handleChangeFilter}
      />
      <Countries countries={filteredCountries} />
    </div>
  );
}

const styles = {
  centeredTitle: {
    textAlign: 'center',
  },
};
