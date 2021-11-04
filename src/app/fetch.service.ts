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

  private readonly rates$: BehaviorSubject<IRate[]> = new BehaviorSubject<IRate[]>([]);
  private readonly loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private readonly error$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  //private readonly response$: BehaviorSubject<IApiResponse | null> = new BehaviorSubject<IApiResponse | null>(null);

  constructor(private _httpClient: HttpClient) { }

  public get rates(): Observable<IRate[]> {
    return this.rates$.asObservable();
  }

  public get loading(): Observable<boolean> {
    return this.loading$.asObservable();
  }

  public get error(): Observable<boolean> {
    return this.error$.asObservable();
  }


  private mapToModel(data: any): IRate[] {
    try {
      let mappedData = Object.keys(data).map((key) => { // chain tap(f => {console.log(f); console.log(f.rates)}) in pipe to debug
        return <IRate>{ // ToDo: refactor this into its own method
          code: key,
          rate: data[key]
        }
      });
      return mappedData;
    }
    catch {
      return []; //ToDo: what to do here?
    }
  }

  public getData(baseCurrencyCode: string = 'GBP'): void {

    this.loading$.next(true);

    this._httpClient.get<IApiResponse>(`${_apiUrl}${baseCurrencyCode}`)
      .pipe(map(data => this.mapToModel(data.rates)),
        // .pipe(map(data => Object.keys(data.rates).map((key) => { // chain tap(f => {console.log(f); console.log(f.rates)}) in pipe to debug
        //   return <IRate>{
        //     code: key,
        //     rate: data.rates[key]
        //   }
        // })),
        finalize(() => this.loading$.next(false))
        // error handling with catchError is handled by the http interceptor, which retries the request
        // catchError here is like the catch() block:
        // return an Observable to keep the stream 'alive' (returning an error ends the stream)
      ).subscribe(receivedItems => {
        // success handler function
        // console.log(receivedItems);
        this.rates$.next(receivedItems);
      },
        (error => {
          // error handler function
          // with the httpInterceptor, it returns String; or
          // without the httpInterceptor, it returns HttpErrorResponse
          this.error$.next(true); // no need to send error to the component
        }),
        () => {
          // completion handler function
          // This "onCompleted()" callback only fires after the "onSuccess()" has completed.
          // It does not fire after the "onError()" callback...
          // i.e.: completion or error are mutually exclusive.
          // ==> this.loading$.next(false); moved to finalize in pipe
        }
      )
  }
}







