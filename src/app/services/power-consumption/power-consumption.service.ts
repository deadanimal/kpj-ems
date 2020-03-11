import { Injectable } from '@angular/core';
import { AsyncSubject, Observable } from 'rxjs';
import { Map } from 'mapbox-gl';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PowerConsumptionService {

  map = new AsyncSubject<Map>();

  constructor(public http: HttpClient) { }

  getData(file): Observable<any> {
    return this.http.get<any>(`../../../assets/data/data.${file}.json`);
  }
}
