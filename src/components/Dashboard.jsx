import React, { useEffect, useState } from 'react';

import { Tabs, Tab } from 'react-bootstrap';
import './Dashboard.css';
import Historical from './Historical';
import Daily from './Daily';
import { lightTheme, darkTheme } from './Themes';
import { Form, Col } from 'react-bootstrap';
import Loading from './Loading';

const BASE_URL = 'https://disease.sh';
const defaultCountry = 'Italy';

function Dashboard(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [countries, setCountries] = useState();
  const [country, setCountry] = useState(defaultCountry);

  let tabsClassName = 'mt-3 ';
  let tabClassName = '';
  if (props.theme === 'dark') {
    tabsClassName += 'dark-tabs';
    tabClassName += 'dark-tab ';
  }

  function fetchCountries(sort) {
    setIsLoaded(true);
    fetch(`${BASE_URL}/v3/covid-19/countries${sort && '?sort=' + sort}`, {
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
          setCountries(countries);
          setCountry(countries[0]);
        },
        (e) => {
          console.error(e);
        }
      )
  }

  useEffect(() => {
    if (!isLoaded) fetchCountries('cases');
  }, [isLoaded, country]);

  if (countries) {
    return (
      <>
        <>
          <style type="text/css">
            {`
            .dark-tabs {
              background-color: ${darkTheme.backround};
              color: ${darkTheme.text};
              border-radius: .25rem;
              border-color: gray;
            }
  
            .dark-tab {
              border-radius: .25rem;
            }
            .dark-tab, .nav-link.active {
              color: ${darkTheme.text};
              
            }
  
            a {
              color: ${props.theme === 'dark' ? darkTheme.text : lightTheme.text}
            }
            a:hover {
              color: ${props.theme === 'dark' ? darkTheme.text : lightTheme.text}
            }
  
            .nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active {
              border-radius: 0.25rem;
            }
            `}
          </style>
        </>
        <Form className='mt-3'>
          <Form.Group as={Form.Row} controlId="country">
            <Form.Label column sm={4} >Country</Form.Label>
            <Col sm={6}>
              <Form.Control
                as="select"
                custom
                value={country}
                defaultValue={defaultCountry}
                onChange={e => { setCountry(e.target.value) }}
                style={
                  props.theme === 'light' ? {} : {
                    backgroundColor: darkTheme.backround,
                    color: darkTheme.text,
                    borderColor: 'gray'
                  }
                }
              >
                {countries && countries.countries &&
                  countries.countries.map((country) => {
                    return (<option value={country}>{country}</option>)
                  })}
              </Form.Control>
            </Col>
          </Form.Group>
        </Form>

        <Tabs
          defaultActiveKey="cumulative"
          id="dash-tabs"
          className={tabsClassName}
        >
          <Tab
            eventKey="cumulative"
            title="Cumulative"
            className={tabClassName}
          >
            <Historical theme={props.theme} country={country} />
          </Tab>
          <Tab
            eventKey="daily"
            title="Daily"
            className={tabClassName}
          >
            <Daily theme={props.theme} country={country} />
          </Tab>
        </Tabs>
      </>
    );
  } else {
    return (<Loading />);
  }

}

export default Dashboard;
