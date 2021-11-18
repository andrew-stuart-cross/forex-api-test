import { of } from "rxjs";
import { fakeRates } from "./unit-test-helpers/rates-helper";

export class FetchServiceStub {
    public getData: jasmine.Spy = jasmine.createSpy('getData');

    // not stubbed as unit test inappropriate.  Integration test better as linked to template
    //public getRates: jasmine.Spy = jasmine.createSpy('getRates');
    //public isError: jasmine.Spy = jasmine.createSpy('isError');
    //public isLoading: jasmine.Spy = jasmine.createSpy('isLoading');
}


    // _fetchService = jasmine.createSpyObj<FetchService>(
    //   '_fetchService', {
    //   getData: undefined, // void,
    //   isLoading:  of(true),
    //   isError: of(false),
    //   getRates: of(fakeRates)
    // }
    // );
