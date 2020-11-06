import React, { useState, useEffect } from 'react';
import { Alert, Form, Col } from 'react-bootstrap';
import { LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Line, Legend } from 'recharts'
import './Dashboard.css';
import { darkTheme } from './Themes';

const BASE_URL = 'https://disease.sh';
const defaultCountry = 'Italy';
const defaultLastDays = '30';
const categoryColor = {
  cases: "#FF0000",
  deaths: "#252525",
  recovered: "#62FF00"
}

function Dashboard(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [countries, setCountries] = useState({});
  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);
  const [countryData, setCountryData] = useState(undefined);
  const [all, setAll] = useState(false);


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
            fetchCountryData(countries[0], all);
          },
          (e) => {
            setIsLoaded(true);
            setError(e);
          }
        )
    }
  }, []);

  function fetchCountryData(country, all) {
    if (!country) return;
    let days = (all ? 'all' : defaultLastDays);
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
    selectedCountry && fetchCountryData(selectedCountry, all);
    return (
      <>
        <Alert variant="light">
          <Alert.Heading>I'm loading the data</Alert.Heading>
          <p>Please be patient...</p>
        </Alert>
      </>
    )
  } else {
    return (
      <>
        <Form className='mt-3'>
          <Form.Group as={Form.Row} controlId="country">
            <Form.Label column sm={4} >Selected Country</Form.Label>
            <Col sm={6}>
              <Form.Control
                as="select"
                custom
                value={selectedCountry}
                defaultValue={defaultCountry}
                onChange={e => {
                  if (e.target.value) {
                    setSelectedCountry(e.target.value);
                    fetchCountryData(e.target.value, all);
                  }
                }}
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
          <Form.Group as={Form.Row} controlId="allDays">
            <Form.Check type="checkbox" label="All history data" onChange={e => {
              if (selectedCountry) {
                fetchCountryData(selectedCountry, !all);
                setAll(!all);
              }
            }} />
          </Form.Group>
        </Form>
        <ResponsiveContainer width='100%' height={500} >
          <LineChart margin={{ left: 25, right: 4 }}>
            <Tooltip formatter={(value) => new Intl.NumberFormat('it').format(value)} />
            <XAxis dataKey="date" allowDuplicatedCategory={false}></XAxis>
            <YAxis type="number" dataKey="number" tickFormatter={(value) => new Intl.NumberFormat('en').format(value)} ></YAxis>
            <Legend />
            {countryData && countryData.map(c => (
              <Line type='monotone' dataKey="number" data={c.data} name={c.name} key={c.name} stroke={categoryColor[c.name]} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </>
    );
  }
}

export default Dashboard;
