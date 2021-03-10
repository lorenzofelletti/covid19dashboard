import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Form } from 'react-bootstrap';

const ChartOptions = (props) => {
  const [state, _setState] = useState(props.opts);

  const setState = (state) => {
    props.changeOpts(state);
    _setState(state);
  }


  return (
    <Form inline>
      <Form.Group controlId="chartsOptions" >
        <Form.Row>
          <Form.Check
            custom
            type="switch"
            label="cases"
            id="casesOpt"
            className="mr-2"
            defaultChecked={state.cases}
            value={state.cases}
            onChange={() => setState({ ...state, cases: !state.cases })}
          />
          <Form.Check
            custom
            type="switch"
            label="deaths"
            id="deathsOpt"
            className="mr-2"
            defaultChecked={state.deaths}
            value={state.deaths}
            onChange={() => setState({ ...state, deaths: !state.deaths })}
          />
          <Form.Check
            custom
            type="switch"
            label="recovered"
            id="recoveredOpt"
            defaultChecked={state.recovered}
            value={state.recovered}
            onChange={() => setState({ ...state, recovered: !state.recovered })}
          />
        </Form.Row>
      </Form.Group>
    </Form>
  )
}

ChartOptions.propTypes = {
  opts: PropTypes.objectOf(PropTypes.bool),
  changeOpts: PropTypes.func
}

export default ChartOptions;