import React from 'react';
import PropTypes from 'prop-types';

import { Form } from 'react-bootstrap';

const ChartOptions = (props) => (
  <Form inline>
    <Form.Group controlId="chartsOptions">
      <Form.Check type="switch" label="cases" onChange={props.changeOpts} id="casesOpt" className="mr-2" />
      <Form.Check type="switch" label="deaths" onChange={props.changeOpts} id="deathsOpt" className="mr-2" />
      <Form.Check type="switch" label="recovered" onChange={props.changeOpts} id="recoveredOpt" />
    </Form.Group>
  </Form>
)

ChartOptions.propTypes = {
  opts: PropTypes.objectOf(PropTypes.bool),
  changeOpts: PropTypes.func
}

export default ChartOptions;
