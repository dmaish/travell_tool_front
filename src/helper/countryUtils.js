import { lookup } from 'country-data';

class countryUtils {
  static getCountryCode(country) {
    const countryCode = lookup.countries({name: country})[0];
    return countryCode.alpha2;
  }
  
  static getCountryFlagUrl(location) {
    const country = location.split(', ')[1];
    const countryCode = this.getCountryCode(country);
    return `https://www.countryflags.io/${countryCode}/flat/64.png`;
  }
}
export default countryUtils;
