import React from 'react';
import PropTypes from 'prop-types';
import {
  LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Line, Legend, Brush,
} from 'recharts';
import './CustomLineChart.css';

import { darkTheme } from '../../Themes';

function formatDate(d) {
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear() - 2000}`;
}

function VaccineChart({ data, theme }) {
  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={500}>
        <LineChart margin={{ left: 25, right: 4 }}>
          <Tooltip
            formatter={(value) => new Intl.NumberFormat('en').format(value)}
            labelFormatter={((d) => `Date: ${formatDate(d)}`)}
          />
          <XAxis
            dataKey="date"
            tickFormatter={(d) => formatDate(d)}
          />
          <YAxis
            type="number"
            dataKey="vaccines"
            tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="vaccines"
            data={data}
            name="vaccines"
            dot={false}
            stroke={theme === 'light' ? '#0000ff' : '#7fffd4'}
          />
          <Brush
            stroke={theme === 'dark' ? darkTheme.text : ''}
            fill={theme === 'dark' ? darkTheme.backround : '#fff'}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

VaccineChart.propTypes = {
  data: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
  theme: PropTypes.string.isRequired,
};

export default VaccineChart;
