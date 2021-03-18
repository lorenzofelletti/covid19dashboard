import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { toast } from 'react-toastify';
import { fetchVaccineCountries, fetchVaccineData } from '../../dataFetching';
import VaccineChart from '../../charts/LineChart/VaccineChart';
import Loading from '../../Loading';
import CountrySelector from './CountrySelector';

const defaultCountry = 'Italy';

function Vaccine(props) {
  const { theme } = props;
  const [countries, setCountries] = useState();
  const [country, setCountry] = useState(defaultCountry);
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    fetchVaccineCountries()
      .then((countriesData) => {
        setCountries(countriesData);
      })
      .catch((e) => toast.error(e));
  }, []);

  useEffect(() => {
    if (!loaded) {
      fetchVaccineData(country, 'all', true)
        .then((fetchedData) => {
          setData(fetchedData);
          setLoaded(true);
        });
      // missing check on error;
    }
  }, [loaded, data]);

  useEffect(() => {
    setLoaded(false);
  }, [country]);

  if (!countries) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <div>
      <div className="mb-3">
        <CountrySelector
          theme={theme}
          countries={countries}
          defaultCountry={defaultCountry}
          selectCountry={setCountry}
        />
      </div>
      {loaded ? (<VaccineChart theme={theme} data={data} />) : (<Loading />)}
    </div>
  );
}

Vaccine.propTypes = {
  theme: PropTypes.string,
};

Vaccine.defaultProps = {
  theme: 'light',
};

export default Vaccine;
