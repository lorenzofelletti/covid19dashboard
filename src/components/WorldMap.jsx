import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchGeoMapData } from './dataFetching';
import CustomChoropleth from './charts/Choropleth/CustomChoropleth';
import ChoroOpts from './charts/Choropleth/ChoroOpts';
import useCurrentWindowSize from './useCurrentWindowSize';
import Loading from './Loading';

const categories = ['cases', 'deaths', 'recovered'];
const defaultCategory = 'cases';

// relative max to have more readable choropleth
const categoryRelMaxValues = {
  cases: 5 * 10 ** 6,
  deaths: 1 * 10 ** 5,
  recovered: 5 * 10 ** 6,
};

export default function WorldMap({ theme }) {
  const windowDimensions = useCurrentWindowSize();

  const [data, setData] = useState();
  const [loaded, setLoaded] = useState(false);
  const [category, setCategory] = useState(defaultCategory);

  useEffect(() => {
    if (!loaded) {
      fetchGeoMapData().then((fetchedData) => {
        setData(fetchedData);
        setLoaded(true);
      });
      // missing check on error
    }
  }, [loaded, data]);

  const maxValue = (_data, _category) => {
    const max = Math.max(..._data);
    // eslint-disable-next-line no-underscore-dangle
    return Math.min(max, categoryRelMaxValues[_category]);
  };

  if (!loaded) return (<Loading />);

  return (
    <>
      <h1>World Map</h1>
      <ChoroOpts
        opts={categories}
        changeOpts={setCategory}
        defaultOpt={defaultCategory}
      />
      <div style={{ height: windowDimensions.width > '800' ? '500px' : '400px', color: '#101010' }} className="mt-3">
        <CustomChoropleth
          data={data.map((item) => ({ id: item.id, value: item[category] }))}
          category={category}
          theme={theme}
          maxValue={maxValue(data.map((item) => item[category]), category)}
          height={windowDimensions.width > '800' ? 500 : 400}
        />
      </div>
    </>
  );
}

WorldMap.propTypes = {
  theme: PropTypes.string.isRequired,
};
