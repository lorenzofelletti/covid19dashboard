import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './App.css';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Dashboard from './components/Dashboard';
import { About } from './components/About';
import NavigationBar from './components/NavigationBar';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Container>
        <Router>
          <Switch>
            <Route exact path='/'>
              <Dashboard />
            </Route>
            <Route epath='/about'>
              <About />
            </Route>
          </Switch>
        </Router>
      </Container>
    </div>
  );
}

export default App;
