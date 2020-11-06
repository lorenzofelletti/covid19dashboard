import React from 'react';
import { LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Line, Legend } from 'recharts';

const categoryColor = {
  cases: "#FF0000",
  deaths: "#252525",
  recovered: "#62FF00"
}

function CustomLineCharts(props) {
  const countryData = props.data;
  return (
    <ResponsiveContainer width='100%' height={500} >
      <LineChart margin={{ left: 25, right: 4 }}>
        <Tooltip formatter={(value) => new Intl.NumberFormat('it').format(value)} />
        <XAxis dataKey="date" allowDuplicatedCategory={false}></XAxis>
        <YAxis type="number" dataKey="number" tickFormatter={(value) => new Intl.NumberFormat('en').format(value)} ></YAxis>
        <Legend />
        {countryData && countryData.map(c => (
          <Line type='monotone' dataKey="number" data={c.data} name={c.name} key={c.name} dot={false} stroke={categoryColor[c.name]} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}

export default CustomLineCharts;