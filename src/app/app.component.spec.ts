import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { FetchService } from './fetch.service';
import { fakeRates } from './unit-test-helpers/rates-helper';


describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let debugElement: DebugElement;
  //let dependencies: { _fetchService: FetchServiceStub };

  let loadingPropertyValue: boolean = true;
  let errorPropertyValue: boolean = false;

  let fakeFetchService: FetchService;


  beforeEach(async () => {

    // dependencies = {
    //   _fetchService: new FetchServiceStub()
    // };

    fakeFetchService = jasmine.createSpyObj<FetchService>(
      'FetchService',
      {
        getData: undefined,
      },
      {
        isLoading: of(loadingPropertyValue),
        isError: of(errorPropertyValue),
        getRates: of(fakeRates)
      }
    );


    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: FetchService, useValue: fakeFetchService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    //fixture.detectChanges();
    debugElement = fixture.debugElement;
  });



  // check if rates are rendered in DOM
  // but don't tie it to testing if service is called, etc

  // if 'retry' button is cliecked, check if getData is called...

  it('should call getData from service init', () => {
    fixture.detectChanges();  // either call here or in beforeEach() above
    expect(fakeFetchService.getData).toHaveBeenCalled();
    expect(fakeFetchService.getData).toHaveBeenCalledTimes(1);
  });


  it('should create the app', () => {
    //const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    //console.log(component);
    expect(component).toBeTruthy();
  });

  it(`should have as title 'forex-api-test'`, () => {
    //const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    expect(component.title).toEqual('forex-api-test');
  });

  it('should render title', () => {
    //const fixture = TestBed.createComponent(AppComponent);
    //fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.hello')?.textContent).toContain('forex-api-test app is running!');
    expect(compiled.querySelector('[data-testid="main-title"]')?.textContent).toContain('forex-api-test app is running!');
  });


  describe('loading..........', () => {



    it('shows loading text when isLoading is true', () => {


      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid="loading-header"]')?.textContent).toContain('is loading: true');

    });


  });

});
