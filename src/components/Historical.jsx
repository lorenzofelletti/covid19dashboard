import React, { useState, useEffect } from 'react';
import { Alert, Form, Col } from 'react-bootstrap';
import CustomLineCharts from './CustomLineChart';
import './Dashboard.css';
import { Loading } from "./Loading";
import { darkTheme } from './Themes';

const BASE_URL = 'https://disease.sh';
const defaultCountry = 'Italy';
const days = 'all';


function Historical(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [countries, setCountries] = useState({});
  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);
  const [countryData, setCountryData] = useState(undefined);


  useEffect(() => {
    if (!isLoaded) {
      fetch(`${BASE_URL}/v3/covid-19/historical?lastdays=1`, {
        headers: {
          'accept': 'application/json',
        }
      })
        .then(res => res.json())
        .then(
          (result) => {
            let countries = { countries: [] };
            result.forEach(d => {
              countries.countries.push(d.country);
            });
            countries.countries = [...new Set(countries.countries)];
            setIsLoaded(true);
            setError(error);
            setCountries(countries);
            setSelectedCountry(countries[0]);
            fetchCountryData(countries[0]);
          },
          (e) => {
            setIsLoaded(true);
            setError(e);
          }
        )
    } else {
      fetchCountryData(selectedCountry);
    }
  }, [selectedCountry, isLoaded, error]);

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
            setCountryData(countryDataFormatted);
          }
          else {
            setError("Bad format response.");
          }
        },
        (e) => {
          setError(e);
        }
      )
  }


  if (!isLoaded || !countryData) {
    fetchCountryData(selectedCountry);
    return (
      <>
        <Loading />
      </>
    )
  } else {
    return (
      <>
        <h1>Cumulative Cases</h1>
        <Form className='mt-3'>
          <Form.Group as={Form.Row} controlId="country">
            <Form.Label column sm={4} >Selected Country</Form.Label>
            <Col sm={6}>
              <Form.Control
                as="select"
                custom
                value={selectedCountry}
                defaultValue={defaultCountry}
                onChange={e => { setSelectedCountry(e.target.value) }}
                style={
                  props.theme === 'light' ? {} : {
                    backgroundColor: darkTheme.backround,
                    color: darkTheme.text,
                    borderColor: 'gray'
                  }
                }
              >
                {countries && countries.countries &&
                  countries.countries.map((country, idx) => {
                    return (<option value={country}>{country}</option>)
                  })}
              </Form.Control>
            </Col>
          </Form.Group>
        </Form>
        <CustomLineCharts data={countryData} />
      </>
    );
  }
}

export default Historical;
