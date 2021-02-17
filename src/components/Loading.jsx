import React from 'react';
import { Alert } from 'react-bootstrap';

export const Loading = () => (
  <>
    <Alert variant="light">
      <Alert.Heading>I'm loading the data</Alert.Heading>
      <p>Please be patient...</p>
    </Alert>
  </>
)

export default Loading;
