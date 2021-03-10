import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ResponsiveChoropleth } from '@nivo/geo';
import countries from './world_countries.json';

export default function CustomChoropleth({
  data, category, theme, maxValue, height,
}) {
  const [colors, setColors] = useState();

  useEffect(() => {
    switch (category) {
      case 'cases':
        setColors('reds');
        break;
      case 'deaths':
        setColors('YlOrRd');
        break;
      case 'recovered':
        setColors('YlGn');
        break;
      default:
        setColors('reds');
    }
  }, [category]);

  return (
    <ResponsiveChoropleth
      data={data}
      features={countries.features}
      margin={{
        top: 0, right: 0, bottom: 0, left: 0,
      }}
      colors={colors}
      domain={[0, maxValue]}
      unknownColor="#666666"
      label="properties.name"
      valueFormat=".2s"
      projectionType="mercator"
      projectionScale={height > 400 ? 120 : 100}
      projectionTranslation={[0.5, 0.6]}
      projectionRotation={[0, 0, 0]}
      enableGraticule
      graticuleLineColor={theme === 'light' ? '#dddddd' : '#333333'}
      borderWidth={0.5}
      borderColor={theme === 'light' ? '#152538' : '#333333'}
      legends={[
        {
          anchor: 'bottom-left',
          direction: 'column',
          justify: true,
          translateX: 20,
          translateY: -100,
          itemsSpacing: 0,
          itemWidth: 94,
          itemHeight: 18,
          itemDirection: 'left-to-right',
          itemTextColor: theme === 'light' ? '#444444' : '#aaaaaa',
          itemOpacity: 0.85,
          symbolSize: 18,
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: theme === 'light' ? '#000000' : '#eeeeee',
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
}

CustomChoropleth.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    value: PropTypes.number,
  })).isRequired,
  category: PropTypes.string,
  theme: PropTypes.string,
  maxValue: PropTypes.number,
  height: PropTypes.number,
};

CustomChoropleth.defaultProps = {
  category: '',
  theme: 'light',
  maxValue: 1 * 10 ** 6,
  height: 400,
};
