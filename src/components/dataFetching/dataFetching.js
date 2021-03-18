export const basename = 'https://disease.sh/';

/** Fetch the countries about which vaccine data are available.
 *  Data come from disease.sh covid APIs v3 (https://disease.sh/docs).
 *
 *  Returns an array with the names (string) of the countries or
 *  an object with the field error if any problem occur.
 */
export async function fetchVaccineCountries() {
  const vaccineUrl = 'v3/covid-19/vaccine/coverage/countries?lastdays=1';
  const url = `${basename}${vaccineUrl}`;

  const data = await fetch(url, { headers: { accept: 'application/json' } })
    .then((res) => res.json())
    .then((res) => {
      // eslint-disable-next-line no-underscore-dangle
      const _data = [];
      res
        .sort((e1, e2) => {
          const e1Vaccines = e1.timeline;
          const e2Vaccines = e2.timeline;
          const keysE1 = Object.keys(e1.timeline);
          const keysE2 = Object.keys(e2.timeline);
          return e2Vaccines[keysE2[0]] - e1Vaccines[keysE1[0]];
        })
        .forEach((elem) => {
          _data.push(elem.country);
        });
      return _data;
    })
    .catch((e) => ({ error: e.toString() }));
  return data;
}

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
