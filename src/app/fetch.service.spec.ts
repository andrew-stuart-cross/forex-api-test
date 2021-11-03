import { TestBed } from '@angular/core/testing';

import { FetchService } from './fetch.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IApiResponse, IRate } from './_models';
import { HttpErrorResponse } from '@angular/common/http';
import { skip } from 'rxjs/operators';
import { pipe } from 'rxjs';


export const fakeRates: IRate[] = [{ code: 'AED', rate: 5.04 }, { code: 'YER', rate: 342.25 }];

const _apiUrl = 'https://api.exchangerate-api.com/v4/latest/GBP';

// important to check that the object is valid JSON!
// use https://jsonlint.com/ to validate the object
// it causes all sorts of issues if the object is not valid!!!!!
export const fakeApiResponse: any =
{
  "provider": "https://www.exchangerate-api.com",
  "WARNING_UPGRADE_TO_V6": "https://www.exchangerate-api.com/docs/free",
  "terms": "https://www.exchangerate-api.com/terms",
  "base": "GBP",
  "date": "2021-11-02",
  "time_last_updated": 1635811201,
  "rates": {
    "AED": 5.04,
    "YER": 342.25
  }
}

describe('FetchService', () => {

  let controller: HttpTestingController;
  let service: FetchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FetchService],
    });
    service = TestBed.inject(FetchService);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('makes an http call', () => {
    let actualRates: IRate[] | undefined; // undefined initial state to check if Observable emits

    service.getData(); // call http request method

    //console.log(actualRates);  // undefined (as it should be here)

    // We expect that the Observable emits a photos array that equals to the one from the API response:
    service.rates.subscribe((ratesObservable) => {
      //console.log(ratesObservable); // [] defined, but empty (i.e. Observable emitted)
      actualRates = ratesObservable
      //console.log(actualRates); // [] defined, but empty (i.e. Observable emitted)
    });

    let actualError: boolean | undefined; // HttpErrorResponse | undefined;

    service.error // skip first default 'false' value emitted...
      .subscribe((error) => {
        actualError = error;
      });

    let finalLoadingState: boolean | undefined;;

    service.loading.pipe(skip(1))
      .subscribe((loading) => {
        finalLoadingState = loading;
      });

    const request = controller.expectOne('https://api.exchangerate-api.com/v4/latest/GBP');
    // Answer the request so the Observable emits a value.
    request.flush(fakeApiResponse); //fakeApiResponse });  // also paste the response object in with {}

    expect(actualRates).toEqual(fakeRates);
    expect(actualError).toBeFalse();
    expect(finalLoadingState).toBeFalse();
  });


  it('#getData should use GET to retrieve data', () => {
    service.getData();
    const testRequest = controller.expectOne('https://api.exchangerate-api.com/v4/latest/GBP');
    expect(testRequest.request.method).toEqual('GET'); // passes
  });


  it('passes through search errors', () => {
    const status = 500;
    const statusText = 'Internal Server Error';
    const errorEvent = new ErrorEvent('API error');

    service.getData(); // call http request method

    let actualError: boolean | undefined; // HttpErrorResponse | undefined;

    service.error.pipe(skip(1)) // skip first default 'false' value emitted...
      .subscribe((error) => {
        actualError = error;
      });

    let finalLoadingState: boolean | undefined;;

    service.loading.pipe(skip(1))
      .subscribe((loading) => {
        finalLoadingState = loading;
      });

    controller.expectOne(_apiUrl).error(errorEvent, { status, statusText });

    expect(actualError).toBeTrue();
    expect(finalLoadingState).toBeFalse();
  });

});




