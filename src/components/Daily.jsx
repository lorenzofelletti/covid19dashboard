import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './Dashboard.css';
import { Loading } from "./Loading";
import CustomBarChart from "./charts/BarChart/CustomBarChart"

const BASE_URL = 'https://disease.sh';
const days = 'all';


function Daily(props) {
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

            countryDataFormatted.forEach(elem => {
              let prev = 0;
              let curr = 0;
              for (let e of elem.data) {
                curr = e.number;
                e.number = (e.number - prev > 0) ? e.number - prev : 0;
                prev = curr;
              }
            });
            let dataCases = countryDataFormatted[0].data;
            let dataDeaths = countryDataFormatted[1].data;
            let dataRecovered = countryDataFormatted[2].data;
            let dataFinal = [];
            for (let i = 0; i < dataCases.length && dataRecovered.length && dataDeaths.length; i++) {
              let datum = { date: dataCases[i].date };
              datum.cases = dataCases[i].number;
              datum.recovered = dataRecovered[i].number;
              datum.deaths = dataDeaths[i].number;
              dataFinal.push(datum);
            }
            countryDataFormatted = dataFinal;
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

  function toPrint(opts) {
    // return only the opts to be displayed
    let res = [];
    for (let o in opts) opts[o] && res.push(o);
    return res;
  }

  if (!isLoaded || !countryData) {
    return (
      <>
        <Loading />
      </>
    )
  } else {
    return (
      <div className="mt-3">
        <CustomBarChart theme={props.theme} countryData={countryData} toPrint={toPrint(opts)} />
      </div>
    );
  }
}

Daily.propTypes = {
  opts: PropTypes.objectOf(PropTypes.bool),
  theme: PropTypes.string,
  country: PropTypes.string.isRequired,
}

export default React.memo(Daily);
