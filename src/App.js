import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './App.css';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import { GlobalStyles } from './components/Globalstyle';
import { lightTheme, darkTheme } from './components/Themes';
import Dashboard from './components/Dashboard';
import About from './components/About';
import NavigationBar from './components/NavigationBar';
import useDarkMode from './components/useDarkMode';
import Vaccine from './components/Pages/Vaccines/Vaccine';
import WorldMap from './components/WorldMap';

const BASENAME = '/covid19dashboard';

function App() {
  const [theme, themeToggler, mountedComponent] = useDarkMode();

  // eslint-disable-next-line react/jsx-filename-extension
  if (!mountedComponent) { return <div />; }

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <>
        <GlobalStyles />
        <ToastContainer autoClose={2500} />
        <div className="App">
          <Router basename={BASENAME}>
            <NavigationBar basename={BASENAME} theme={theme} toggleTheme={themeToggler} />
            <Container>
              <Switch>
                <Route exact path="/">
                  <Dashboard theme={theme} />
                </Route>
                <Route path="/about">
                  <About theme={theme} />
                </Route>
                <Route path="/vaccine">
                  <Vaccine theme={theme} />
                </Route>
                <Route path="/map">
                  <WorldMap theme={theme} />
                </Route>
              </Switch>
            </Container>
          </Router>
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
