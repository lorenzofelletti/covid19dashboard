import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

function Loading({ theme }) {
  return (
    <>
      <Alert variant={theme}>
        <Alert.Heading>I&apos;m loading the data</Alert.Heading>
        <p>Please be patient...</p>
      </Alert>
    </>
  );
}

Loading.propTypes = {
  theme: PropTypes.string,
};

Loading.defaultProps = {
  theme: 'light',
};

export default Loading;
