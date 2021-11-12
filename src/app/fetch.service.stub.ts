export class FetchServiceStub {
    public getData: jasmine.Spy = jasmine.createSpy('getData');

    // not stubbed as unit test inappropriaee.  Integration test better as linked to template
    //public rates: jasmine.Spy = jasmine.createSpy('rates');
    //public isError: jasmine.Spy = jasmine.createSpy('isError');
    //public isLoading: jasmine.Spy = jasmine.createSpy('isLoading');
}
