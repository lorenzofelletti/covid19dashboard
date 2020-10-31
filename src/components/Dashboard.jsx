import React, { useState, useEffect } from 'react';
import { Alert, Form, Col } from 'react-bootstrap';
import './Dashboard.css';
import { LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Line, Legend } from 'recharts'


const BASE_URL = 'https://disease.sh';

function Dashboard(props) {
  const categoryColor = {
    cases: "#FF0000",
    deaths: "#252525",
    recovered: "#62FF00"
  }
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [countries, setCountries] = useState({});
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
          },
          (e) => {
            setIsLoaded(true);
            setError(e);
          }
        )
    }
  }, []);

  function fetchCountryData(country) {
    fetch(`${BASE_URL}/v3/covid-19/historical/${country}?lastdays=30`, {
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


  if (!isLoaded) {
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
                onChange={e => {
                  if (e.target.value)
                    fetchCountryData(e.target.value);
                }}
              >
                <option value='' selected={true}>- Select a country -</option>
                {countries && countries.countries &&
                  countries.countries.map((country, idx) => {
                    return (<option value={country}>{country}</option>)
                  })}
              </Form.Control>
            </Col>
          </Form.Group>
        </Form>
        <ResponsiveContainer width='100%' height={500}>
          <LineChart>
            <Tooltip />
            <XAxis dataKey="date" allowDuplicatedCategory={false}></XAxis>
            <YAxis type="number" dataKey="number"></YAxis>
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
