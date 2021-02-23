import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import CustomLineCharts from './charts/CustomLineChart';
import './Dashboard.css';
import { Loading } from "./Loading";

const BASE_URL = 'https://disease.sh';
const days = 'all';


function Historical(props) {
  const [country, setCountry] = useState(props.country);
  const [isLoaded, setIsLoaded] = useState(false);
  const [countryData, setCountryData] = useState(undefined);

  function fetchCountryData(country) {
    if (!country) return;
    fetch(`${BASE_URL}/v3/covid-19/historical/${country}?lastdays=${days}`, {
      headers: {
        'accept': 'application/json'
      }
    })
      .then(res => res.json())
      .then(
        (result) => {
          if (result.timeline &&
            result.timeline.cases &&
            result.timeline.deaths &&
            result.timeline.recovered) {

            let countryDataFormatted = [];
            for (let [category, values] of Object.entries(result.timeline)) {
              let cat = { name: category, data: [] };
              for (let [date, number] of Object.entries(values)) {
                cat.data.push({
                  date: date,
                  number: number
                });
              }
              countryDataFormatted.push(cat);
            }
            setIsLoaded(true);
            setCountryData(countryDataFormatted);
          }
          else {
            console.error("Bad format response.");
          }
        },
        (e) => {
          console.error(e);
        }
      )
  }

  useEffect(() => {
    if (props.country !== country) {
      setCountry(props.country);
      setIsLoaded(false);
    }
    if (!isLoaded) fetchCountryData(props.country);
  }, [isLoaded, country, props.country])


  if (!isLoaded || !countryData) {
    return (
      <>
        <Loading />
      </>
    )
  } else {
    return (
      <>
        <h1>Cumulative Cases</h1>
        <CustomLineCharts data={countryData} />
      </>
    );
  }
}

Historical.propTypes = {
  theme: PropTypes.string,
  country: PropTypes.string.isRequired,
}

export default React.memo(Historical);
