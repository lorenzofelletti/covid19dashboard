import React from 'react';
import PropTypes from 'prop-types';

import {
  BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Bar, Legend, Brush,
} from 'recharts';

import { darkTheme } from '../../Themes';
import categoryColor from '../../colors/colorsConsts';
import './CustomBarChart.css';

function CustomBarChart(props) {
  const { countryData } = props;
  const { toPrint } = props;
  const { theme } = props;

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={500}>
        <BarChart margin={{ left: 25, right: 4 }} data={countryData}>
          <Tooltip formatter={(value) => new Intl.NumberFormat('it').format(value)} />
          <XAxis dataKey="date" />
          <YAxis type="number" tickFormatter={(value) => new Intl.NumberFormat('it').format(value)} />
          <Legend />
          <Brush
            dataKey="date"
            stroke={theme === 'dark' ? darkTheme.text : ''}
            fill={theme === 'dark' ? darkTheme.backround : '#fff'}
          />
          {toPrint.map((c) => (<Bar dataKey={c} name={c} key={c} fill={categoryColor[c]} />))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

CustomBarChart.propTypes = {
  countryData: PropTypes.arrayOf(PropTypes.object).isRequired,
  theme: PropTypes.string,
  toPrint: PropTypes.arrayOf(PropTypes.string),
};

CustomBarChart.defaultProps = {
  theme: 'light',
  toPrint: [],
};

export default CustomBarChart;
