import { Injectable } from '@angular/core';
import { Country, State } from '../models/country.model';
import countriesData from '../../../../public/countries.json';

@Injectable({
  providedIn: 'root'
})
export class GeoService {
  private countries: Country[] = countriesData;

  getCountries(): Country[] {
    return this.countries.sort((a, b) => a.name.localeCompare(b.name));
  }

  getStatesByCountry(countryName: string): State[] {
    const country = this.countries.find(c => c.name === countryName);
    return country?.states?.sort((a, b) => a.name.localeCompare(b.name)) || [];
  }
}