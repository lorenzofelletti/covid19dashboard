import React from 'react';
import { Alert } from 'react-bootstrap';

function Loading() {
  return (
    <>
      <Alert variant="light">
        <Alert.Heading>I&apos;m loading the data</Alert.Heading>
        <p>Please be patient...</p>
      </Alert>
    </>
  );
}

export default Loading;
