import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IApiResponse, IRate } from './_models';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  ITEMS_URL = 'api.exchangerate-api.com/v4/latest/';

  private readonly items$: BehaviorSubject<IRate[]> = new BehaviorSubject<IRate[]>([]);
  //private readonly response$: BehaviorSubject<IApiResponse | null> = new BehaviorSubject<IApiResponse | null>(null);

  constructor(private _httpClient: HttpClient) { }

  // *************
  // see if it is possible to map IApiResponse
  // *************

  fetchList(): void {
    const baseCurrencyCode = 'GBP';
    this._httpClient.get<IApiResponse>(`https://api.exchangerate-api.com/v4/latest/${baseCurrencyCode}`)
      .pipe(map(data => Object.keys(data.rates).map((key) => {
        return <IRate>{
          code: key,
          rate: data.rates[key]
        }
      }))).subscribe(receivedItems => {
        //console.log(receivedItems);
        this.items$.next(receivedItems);
      });
  }

  get rates(): Observable<IRate[]> {
    return this.items$.asObservable();
  }
}
