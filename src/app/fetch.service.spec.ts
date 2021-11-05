import { TestBed } from '@angular/core/testing';
import { FetchService } from './fetch.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IRate } from './_models';
import { skip } from 'rxjs/operators';
import { fakeApiResponse, fakeRates } from './unit-test-helpers/rates-helper';

const _apiUrl = 'https://api.exchangerate-api.com/v4/latest/GBP';

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
    // Arrange
    let actualRates: IRate[] | undefined; // undefined initial state to check if Observable emits
    let actualErrorState: boolean | undefined;
    let finalLoadingState: boolean | undefined;

    // Act
    service.getData(); // call http request method

    // We expect that the Observable emits an array that equals to the one from the API response:
    service.rates.subscribe((ratesObservable) => {
      actualRates = ratesObservable
    });

    service.error
      .subscribe((error) => {
        actualErrorState = error;
      });

    service.loading.pipe(skip(1)) // skip first default 'true' value emitted...
      .subscribe((loading) => {
        finalLoadingState = loading;
      });

    const request = controller.expectOne(_apiUrl);
    // Answer the request so the Observable emits a value.
    request.flush(fakeApiResponse); // also paste the response object in with {}

    // Assert
    expect(actualRates).toEqual(fakeRates);
    expect(actualErrorState).toBeFalse();
    expect(finalLoadingState).toBeFalse();
  });


  it('#getData should use GET to retrieve data', () => {
    service.getData();
    const testRequest = controller.expectOne(_apiUrl);
    expect(testRequest.request.method).toEqual('GET');
  });


  it('passes through search errors', () => {
    // Arrange
    const status = 500;
    const statusText = 'Internal Server Error';
    const errorEvent = new ErrorEvent('API error');
    let actualErrorState: boolean | undefined;
    let finalLoadingState: boolean | undefined;;

    // Act & Assert
    service.getData(); // call http request method

    service.error.pipe(skip(1)) // skip first, default 'false' value emitted...
      .subscribe((error) => {
        actualErrorState = error;
      });

    service.loading.pipe(skip(1)) // skip first, default 'true' value emitted...
      .subscribe((loading) => {
        finalLoadingState = loading;
      });

    controller.expectOne(_apiUrl).error(errorEvent, { status, statusText });

    expect(actualErrorState).toBeTrue();
    expect(finalLoadingState).toBeFalse();
  });

});

