import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import './Dashboard.css';
import Loading from './Loading';
import CustomBarChart from './charts/BarChart/CustomBarChart';

const BASE_URL = 'https://disease.sh';
const days = 'all';

function Daily(props) {
  const { theme, opts, country } = props;
  const [isLoaded, setIsLoaded] = useState(false);
  const [countryData, setCountryData] = useState(undefined);

  function fetchCountryData(countryToFetch) {
    if (!countryToFetch) return;
    fetch(`${BASE_URL}/v3/covid-19/historical/${countryToFetch}?lastdays=${days}`, {
      headers: {
        accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result?.timeline?.cases
            && result?.timeline?.deaths
            && result?.timeline?.recovered) {
            let countryDataFormatted = [];
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

            countryDataFormatted.forEach((elem) => {
              let prev = 0;
              let curr = 0;
              // eslint-disable-next-line no-restricted-syntax
              for (const e of elem.data) {
                curr = e.number;
                e.number = (e.number - prev > 0) ? e.number - prev : 0;
                prev = curr;
              }
            });
            const dataCases = countryDataFormatted[0].data;
            const dataDeaths = countryDataFormatted[1].data;
            const dataRecovered = countryDataFormatted[2].data;
            const dataFinal = [];
            /* && dataRecovered.length && dataDeaths.length was here:
            for( ... ; ... here ; ...) */
            for (let i = 0; i < dataCases.length; i++) {
              const datum = { date: dataCases[i].date };
              datum.cases = dataCases[i].number;
              datum.recovered = dataRecovered[i].number;
              datum.deaths = dataDeaths[i].number;
              dataFinal.push(datum);
            }
            countryDataFormatted = dataFinal;
            setIsLoaded(true);
            setCountryData(countryDataFormatted);
          } else {
            toast('Bad response format.', {
              type: 'error',
              position: 'top-right',
            });
          }
        },
        () => {
          toast('Failed to fetch', {
            type: 'error',
            position: 'top-right',
          });
        },
      );
  }

  useEffect(() => {
    fetchCountryData(country);
  }, [country]);

  /** Return only the opts to be displayed
   *  remember that unwanted options are falsy. */
  function toPrint(optsToPrint) {
    const res = [];
    // eslint-disable-next-line no-restricted-syntax, guard-for-in, no-unused-expressions
    for (const o in optsToPrint) optsToPrint[o] && res.push(o);
    return res;
  }

  if (!isLoaded || !countryData) {
    return (
      <>
        <Loading theme={theme} />
      </>
    );
  }
  return (
    <div className="mt-3">
      <CustomBarChart theme={theme} countryData={countryData} toPrint={toPrint(opts)} />
    </div>
  );
}

Daily.propTypes = {
  opts: PropTypes.objectOf(PropTypes.bool).isRequired,
  theme: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
};

export default React.memo(Daily);
