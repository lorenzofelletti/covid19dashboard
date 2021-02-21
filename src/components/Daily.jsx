import React, { useState, useEffect } from 'react';
import { BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Bar, Legend, Brush } from 'recharts';
import './Dashboard.css';
import { Loading } from "./Loading";
import { darkTheme } from './Themes';

const BASE_URL = 'https://disease.sh';
const days = 'all';

const categoryColor = {
  cases: "#FF0000",
  deaths: "#252525",
  recovered: "#62FF00"
}

function Daily(props) {
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


  if (!isLoaded || !countryData) {
    return (
      <>
        <Loading />
      </>
    )
  } else {
    return (
      <>
        <h1>Daily Cases</h1>
        <ResponsiveContainer width='100%' height={500} >
          <BarChart margin={{ left: 25, right: 4 }} data={countryData}>
            <Tooltip formatter={(value) => new Intl.NumberFormat('it').format(value)} />
            <XAxis dataKey="date"></XAxis>
            <YAxis type="number" tickFormatter={(value) => new Intl.NumberFormat('en').format(value)} ></YAxis>
            <Legend />
            <Brush dataKey="date" stroke={props.theme === "dark" ? darkTheme.text : ""} fill={props.theme === "dark" ? darkTheme.backround : "#fff"} />
            <Bar dataKey="cases" name={'cases'} key={'cases'} fill={categoryColor['cases']} />
            <Bar dataKey="deaths" name={'deaths'} key={'deaths'} fill={categoryColor['deaths']} />
            <Bar dataKey="recovered" name={'recovered'} key={'recovered'} fill={categoryColor['recovered']} />
          </BarChart>
        </ResponsiveContainer>
      </>
    );
  }
}

export default React.memo(Daily);
