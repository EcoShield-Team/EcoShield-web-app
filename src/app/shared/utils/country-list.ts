import * as isoCountries from 'i18n-iso-countries';
import es from 'i18n-iso-countries/langs/es.json';

isoCountries.registerLocale(es);

export interface CountryOption {
  code: string;
  name: string;
}

export const countryList: CountryOption[] = Object.entries(isoCountries.getNames('es'))
  .map(([code, name]) => ({
    code,
    name: name as string,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));
