export const basename = 'https://disease.sh/';

const vaccineRelUrl = 'v3/covid-19/vaccine/coverage/countries/';
/** Fetch data about the vaccines from https://disease.sh.
 *
 *  country -> the country of which you want the data
 *
 *  timespan -> can be an integer number (also of string type) or 'all' to fetch
 *  all the data available
 *
 *  startWithNotNull -> true if you want the series to start with the first day with not
 *  null vaccines.
 */
export async function fetchVaccineData(country, timespan, startWithNotNull) {
  if (!country) return undefined;
  const url = `${basename}${vaccineRelUrl}${country}?lastdays=${timespan}`;

  const dataObj = await fetch(url, { headers: { accept: 'application/json' } })
    .then((res) => res.json())
    .then((res) => res.timeline)
    .catch(() => undefined);

  const data = [];
  if (!dataObj) return data;

  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const date in dataObj) {
    data.push({ date: new Date(date), vaccines: dataObj[date] });
  }
  data.sort((d1, d2) => d1.date - d2.date);

  if (!startWithNotNull) return data;

  const firstNotZeroIdx = data.findIndex((val) => val.vaccines > 0);
  return data.filter((val, idx) => idx >= firstNotZeroIdx);
}

const geoMapRelUrl = 'v3/covid-19/countries';
export async function fetchGeoMapData() {
  const url = `${basename}${geoMapRelUrl}`;
  const data = await fetch(url, { headers: { accept: 'application/json' } })
    .then((res) => res.json())
    .then((res) => res.map((country) => ({
      id: country?.countryInfo?.iso3,
      cases: country.cases,
      deaths: country.deaths,
      recovered: country.recovered,
    })))
    .catch(() => {});

  return data;
}
