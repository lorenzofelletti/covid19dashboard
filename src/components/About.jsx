import React from 'react';
import './About.css';

function About() {
  return (
    <>
      <h1>About</h1>
      <h2>
        Covid-19 Dashboard
      </h2>
      <p>
        See the current Covid-19 situation.
      </p>
      <h3>whoami</h3>
      <p>
        My name is
        {' '}
        <a href="https://lorenzofelletti.github.io">Lorenzo Felletti</a>
        {' '}
        and I&apos;m a computer engineering student ad the University of Bologna.
      </p>
      <p>
        Source code
        {' '}
        <a href="https://github.com/lorenzofelletti/covid19dashboard">here</a>
        .
      </p>
    </>
  );
}

export default About;
