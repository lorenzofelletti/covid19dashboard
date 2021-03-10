import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Form, Row } from 'react-bootstrap';

const ChoroOpts = ({ opts, changeOpts, defaultOpt }) => {
  const [state, _setState] = useState();

  useEffect(() => {
    const stateObj = {};
    opts.forEach((opt) => {
      stateObj[opt] = opt === defaultOpt;
    });
    _setState(stateObj);
  }, []);

  const setState = (optToChange) => {
    changeOpts(optToChange);
    const newState = { ...state };
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const opt in newState) {
      newState[opt] = opt === optToChange;
    }
    _setState(newState);
  };

  if (!state) {
    return (
      <Form inline>
        <Form.Group controlId="chartOpts">
          <Form.Row>
            {opts.map((opt) => (
              <Form.Check
                custom
                type="radio"
                label={opt}
                id={`${opt}Id`}
                key={`${opt}Key`}
                className="mr-2"
              />
            ))}
          </Form.Row>
        </Form.Group>
      </Form>
    );
  }

  return (
    <Form inline>
      <Form.Group controlId="chartOpts" as={Row}>
        {opts.map((opt) => (
          <Form.Check
            type="radio"
            label={opt}
            id={`${opt}Id`}
            key={`${opt}Key`}
            name="opts"
            className="mr-2"
            defaultChecked={opt === defaultOpt}
            onChange={() => setState(opt)}
          />
        ))}
      </Form.Group>
    </Form>
  );
};

ChoroOpts.propTypes = {
  opts: PropTypes.arrayOf(PropTypes.string).isRequired,
  changeOpts: PropTypes.func.isRequired,
  defaultOpt: PropTypes.string,
};

ChoroOpts.defaultProps = {
  defaultOpt: undefined,
};

export default ChoroOpts;