import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import './Dashboard.css';
import Historical from './Historical';
import Daily from './Daily';
import { darkTheme } from './Themes'

function Dashboard(props) {

  let tabsClassName = 'mt-3 ';
  let tabClassName = '';
  if (props.theme === 'dark') {
    tabsClassName += 'dark-tabs';
    tabClassName += 'dark-tab ';
  }
  return (
    <>
      <>
        <style type="text/css">
          {`
          .dark-tabs {
            background-color: ${darkTheme.backround};
            color: ${darkTheme.text};
            border-radius: .25rem;
            border-color: gray;
          }

          .dark-tab {
            border-radius: .25rem;
          }
          .dark-tab, .nav-link.active {
            color: ${darkTheme.text};
            
          }

          a {
            color: ${darkTheme.text}
          }
          a:hover {
            color: ${darkTheme.text}
          }

          .nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active {
            border-radius: 0.25rem;
          }
          `}
        </style>
      </>
      <Tabs
        defaultActiveKey="cumulative"
        id="dash-tabs"
        className={tabsClassName}
      >
        <Tab
          eventKey="cumulative"
          title="Cumulative"
          className={tabClassName}
        >
          <Historical theme={props.theme} />
        </Tab>
        <Tab
          eventKey="daily"
          title="Daily"
          className={tabClassName}
        >
          <Daily theme={props.theme} />
        </Tab>
      </Tabs>
    </>
  );
}

export default Dashboard;
