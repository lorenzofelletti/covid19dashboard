import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { fetchVaccineData } from './dataFetching';
import VaccineChart from './charts/LineChart/VaccineChart';
import Loading from './Loading';

function Vaccine(props) {
  const { theme, country } = props;
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState();

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

  if (!loaded) {
    return (
      <div>
        <h1>Vaccines</h1>
        <Loading theme={theme} />
      </div>
    );
  }
  return (
    <div>
      <h1>Vaccines</h1>
      <VaccineChart theme={theme} data={data} />
    </div>
  );
}

Vaccine.propTypes = {
  theme: PropTypes.string,
  country: PropTypes.string,
};

Vaccine.defaultProps = {
  country: 'Italy',
  theme: 'light',
};

export default Vaccine;
