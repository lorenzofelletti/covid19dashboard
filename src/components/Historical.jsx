import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import CustomLineCharts from './charts/LineChart/CustomLineChart';
import './Dashboard.css';
import { Loading } from "./Loading";

const BASE_URL = 'https://disease.sh';
const days = 'all';


function Historical(props) {
  const opts = props.opts;
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

  const filterData = (v, id) => {
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
        y = opts.recovered
        break;
      default:
        break;
    }
    if (y) return v;
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
      <div className="mt-3">
        <CustomLineCharts data={countryData.filter((v, id) => filterData(v, id))} />
      </div>
    );
  }
}

Historical.propTypes = {
  opts: PropTypes.objectOf(PropTypes.bool),
  theme: PropTypes.string,
  country: PropTypes.string.isRequired,
}

export default React.memo(Historical);
