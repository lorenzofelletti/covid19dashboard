import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import './Dashboard.css';
import Historical from './Historical';
import Daily from './Daily';

function Dashboard(props) {
  return (
    <>
    <Tabs defaultActiveKey="cumulative" id="dash-tabs"  className='mt-3'>
      <Tab eventKey="cumulative" title="Cumulative">
        <Historical theme={props.theme}/>
      </Tab>
      <Tab eventKey="daily" title="Daily">
        <Daily theme={props.theme}/>
      </Tab>
      </Tabs>
    </>
  );
}

export default Dashboard;
