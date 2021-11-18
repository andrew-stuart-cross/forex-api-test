import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FetchService } from './fetch.service';
import { FetchServiceStub } from './fetch.service.stub';


// INTEGRATION tests are better here.  
// There is no logic.  It is all in the service.
// Question is here is: does the component get and display the data from the service?
// So integraion...



describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let debugElement: DebugElement;
  let dependencies: { _fetchService: FetchServiceStub };

  //let deleteProductsSubject = new BehaviorSubject<boolean>(true);

  beforeEach(async () => {

    dependencies = {
      _fetchService: new FetchServiceStub()
    };

    //dependencies._fetchService.loading.and.returnValue(deleteProductsSubject.asObservable());


    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: FetchService, useValue: dependencies._fetchService }
      ]
    }).compileComponents();

    // (dependencies.fetchService.rates as jasmine.Spy).and.returnValue(of([]));
      //{ code: 'product', rate: 1 }
    //]);

    fixture = TestBed.createComponent(AppComponent);
    //fixture.detectChanges();
    debugElement = fixture.debugElement;
  });



  // check if rates are rendered in DOM
  // but don't tie it to testing if service is called, etc

  // if 'retry' button is cliecked, check if getData is called...

  it('should call getData from service init', () => {
    
    fixture.detectChanges();  // either call here or in beforeEach() above
    expect(dependencies._fetchService.getData).toHaveBeenCalled();
    expect(dependencies._fetchService.getData).toHaveBeenCalledTimes(1);

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





  // describe('on initialisation', () => {
  //   //let deleteProductsSubject: Subject<boolean>;

  //   let deleteProductsSubject = new BehaviorSubject<boolean>(true);
  
  //   //beforeEach(() => {
  //     //deleteProductsSubject =  new BehaviorSubject<boolean>(true);
  //     (dependencies.fetchService.loading as jasmine.Spy).and.returnValue(
  //       deleteProductsSubject.asObservable()
  //     );
  //   //});
  
  //   beforeEach(() => {
  //     deleteProductsSubject = new Subject();
  //     (dependencies.fetchService.loading as jasmine.Spy).and.returnValue(
  //       deleteProductsSubject.asObservable()
  //     );
  //   });
  // });


});


describe('AppComponent integration tests', () => {


  it('whatever...', () => {

  });

});
