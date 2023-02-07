import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from './../models/country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  urlPrefix: string = "http://localhost:9090"; //make this as empty ("") if you are using asp.net core [without CORS]

  constructor(private httpClient: HttpClient) { }

  getCountries(): Observable<Country[]> {
    return this.httpClient.get<Country[]>(this.urlPrefix + '/api/countries', { responseType: 'json' });
  }

  // getCountries(): Country[] {
  //   return [
  //     new Country(1, 'India'),
  //     new Country(2, 'UK'),
  //     new Country(3, 'USA'),
  //     new Country(4, 'Japan')
  //   ];
  // }
}
