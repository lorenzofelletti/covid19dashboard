import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import CustomLineCharts from './charts/LineChart/CustomLineChart';
import './Dashboard.css';
import Loading from './Loading';

const BASE_URL = 'https://disease.sh';
const days = 'all';

function Historical(props) {
  const { opts } = props;
  const { theme } = props;
  const [country, setCountry] = useState(props.country);
  const [isLoaded, setIsLoaded] = useState(false);
  const [countryData, setCountryData] = useState(undefined);

  function fetchCountryData(_country) {
    if (!_country) return;
    fetch(`${BASE_URL}/v3/covid-19/historical/${_country}?lastdays=${days}`, {
      headers: {
        accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.timeline
            && result.timeline.cases
            && result.timeline.deaths
            && result.timeline.recovered) {
            const countryDataFormatted = [];
            // eslint-disable-next-line no-restricted-syntax
            for (const [category, values] of Object.entries(result.timeline)) {
              const cat = { name: category, data: [] };
              // eslint-disable-next-line no-restricted-syntax
              for (const [date, number] of Object.entries(values)) {
                cat.data.push({
                  date,
                  number,
                });
              }
              countryDataFormatted.push(cat);
            }
            setIsLoaded(true);
            setCountryData(countryDataFormatted);
          } else {
            toast.error('Bad response format.');
          }
        },
        (e) => {
          toast.error(e);
        },
      );
  }

  function filterData(v, id) {
    // y = true if:
    // id is that of cases && opts.cases is true
    // id is that of deaths && opts.deaths is true
    // id of recovered && opts.recovered === true
    let y;
    switch (id) {
      case 0:
        y = opts.cases;
        break;
      case 1:
        y = opts.deaths;
        break;
      case 2:
        y = opts.recovered;
        break;
      default:
        break;
    }
    if (y) return v;
    return undefined;
  }

  useEffect(() => {
    if (props.country !== country) {
      setCountry(props.country);
      setIsLoaded(false);
    }
    if (!isLoaded) fetchCountryData(props.country);
  }, [isLoaded, country]);

  if (!isLoaded || !countryData) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <div className="mt-3">
      <CustomLineCharts
        data={countryData.filter((v, id) => filterData(v, id))}
        theme={theme}
      />
    </div>
  );
}

Historical.propTypes = {
  opts: PropTypes.objectOf(PropTypes.bool),
  theme: PropTypes.string,
  country: PropTypes.string.isRequired,
};

Historical.defaultProps = {
  opts: {},
  theme: 'light',
};

export default React.memo(Historical);
