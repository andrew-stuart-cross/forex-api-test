import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { IApiResponse, IRate } from './_models';

const _apiUrl = 'https://api.exchangerate-api.com/v4/latest/';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  private readonly items$: BehaviorSubject<IRate[]> = new BehaviorSubject<IRate[]>([]);
  private readonly loading$ = new BehaviorSubject<boolean>(true);
  private readonly error$ = new BehaviorSubject<boolean>(false);
  //public errorObject = null;
  //private readonly response$: BehaviorSubject<IApiResponse | null> = new BehaviorSubject<IApiResponse | null>(null);

  constructor(private _httpClient: HttpClient) { }

  // *************
  // see if it is possible to map IApiResponse
  // *************


  public fetchList(baseCurrencyCode: string = 'GBP'): void {

    this.loading$.next(true);

    this._httpClient.get<IApiResponse>(`${_apiUrl}${baseCurrencyCode}`)
      .pipe(finalize(() => this.loading$.next(false))
      ,map(data => Object.keys(data.rates).map((key) => {
        return <IRate>{
          code: key,
          rate: data.rates[key]
        }
      }))).subscribe(receivedItems => {
        //console.log(receivedItems);
        this.items$.next(receivedItems);
      },
        (error => {
          // with the httpInterceptor, it returns String; or
          //without the httpInterceptor, it returns HttpErrorResponse

          //this.errorObject = error; //no need to send error to component
          //console.log(error);
          this.error$.next(true);
        }),
        () => { 
          // The "onCompleted()" callback only fires after the "onSuccess()" has completed. It does not fire after the "onError()" callback
          // ==> this.loading$.next(false); moved to finalize in pipe
        })
  }

  public get rates(): Observable<IRate[]> {
    return this.items$.asObservable();
  }

  public get loading(): Observable<boolean> {
    return this.loading$.asObservable();
  }

  public get error(): Observable<boolean> {
    return this.error$.asObservable();
  }
}
