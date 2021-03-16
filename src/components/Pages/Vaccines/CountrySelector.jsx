import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Form, Col } from 'react-bootstrap';
import { darkTheme } from '../../Themes';

function CountrySelector(props) {
  const {
    theme,
    countries,
    selectCountry,
    defaultCountry,
  } = props;
  const [country, _setCountry] = useState(defaultCountry);

  const setCountry = (value) => {
    _setCountry(value);
    selectCountry(value);
  };

  useEffect(() => {}, [countries]);

  return (
    <Form className="mt-3" inline>
      <Form.Group as={Form.Row} controlId="country">
        <Form.Label column sm={4}>
          Country
        </Form.Label>
        <Col sm={6}>
          <Form.Control
            as="select"
            custom
            className="ml-3"
            value={country}
            defaultValue={defaultCountry}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
            style={
              theme === 'light'
                ? {}
                : {
                  backgroundColor: darkTheme.backround,
                  color: darkTheme.text,
                  borderColor: 'gray',
                }
            }
          >
            {countries?.map((_country) => (
              <option key={_country} value={_country}>
                {_country}
              </option>
            ))}
          </Form.Control>
        </Col>
      </Form.Group>
    </Form>
  );
}

CountrySelector.propTypes = {
  theme: PropTypes.string,
  countries: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectCountry: PropTypes.func,
  defaultCountry: PropTypes.string,
};

CountrySelector.defaultProps = {
  theme: 'light',
  selectCountry(country) {
    return country;
  },
  defaultCountry: '',
};

export default CountrySelector;
