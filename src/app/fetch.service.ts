import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IApiResponse, IRate } from './_models';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  ITEMS_URL = 'https://api.exchangerate-api.com/v4/latest/';

  private readonly items$: BehaviorSubject<IRate[]> = new BehaviorSubject<IRate[]>([]);
  private loading$ = new BehaviorSubject<boolean>(true);
  public errorObject = null;
  //private readonly response$: BehaviorSubject<IApiResponse | null> = new BehaviorSubject<IApiResponse | null>(null);

  constructor(private _httpClient: HttpClient) { }

  // *************
  // see if it is possible to map IApiResponse
  // *************


  public fetchList(baseCurrencyCode: string = 'GBP'): void {
    //const baseCurrencyCode = 'GBP';

    this.loading$.next(true);

    this._httpClient.get<IApiResponse>(`https://api.exchangerate-api.com/v4/latest/${baseCurrencyCode}`)
      .pipe(map(data => Object.keys(data.rates).map((key) => {
        return <IRate>{
          code: key,
          rate: data.rates[key]
        }
      })))
      .subscribe(receivedItems => {
        //console.log(receivedItems);
        this.items$.next(receivedItems);
      },
        (error => {
          this.errorObject = error;
          console.log(this.errorObject);
        }),
        () => {
          this.loading$.next(false);
        })
  }

  // errorMessage: BehaviorSubject<any> = new BehaviorSubject<any>();

  // handleError(error: Error) {
  //   errorMessage.next(error.message);
  //   this.items$.next(null);
  // }

  public get rates(): Observable<IRate[]> {
    return this.items$.asObservable();
  }

  public get loading(): Observable<boolean> {
    return this.loading$.asObservable();
  }

}
