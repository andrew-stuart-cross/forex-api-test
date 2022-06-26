import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { AppComponent } from './app.component';
import { FetchService } from './fetch.service';
import { fakeRates } from './unit-test-helpers/rates-helper';

let fakeLoading$: Observable<boolean>;
let fakeError$: Observable<boolean>;


describe('AppComponent - fake service (SpyObj) with no logic', () => {
  let fixture: ComponentFixture<AppComponent>;
  let debugElement: DebugElement;
  let fakeFetchService: FetchService;

  beforeEach(async () => {

    fakeFetchService = jasmine.createSpyObj<FetchService>(
      'FetchService',
      {
        getData: undefined,
      },
      {
        isLoading: of(false),
        isError: of(false),
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


  it('should create the app', () => {
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it(`should have as title 'forex-api-test'`, () => {
    //const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    expect(component.title).toEqual('forex-api-test');
  });

  it('should render title', () => {
    //fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.hello')?.textContent).toContain('forex-api-test app is running!');
    expect(compiled.querySelector('[data-testid="main-title"]')?.textContent).toContain('forex-api-test app is running!');
  });


  describe('test service is called', () => {

    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should call getData on init', () => {
      expect(fakeFetchService.getData).toHaveBeenCalled();
      expect(fakeFetchService.getData).toHaveBeenCalledTimes(1);
    });

    it('should render rates', fakeAsync(() => {
      const compiled = fixture.nativeElement as HTMLElement;
      tick();
      //console.log(compiled.querySelector('[data-testid="main-content"]')?.textContent);
      expect(compiled.querySelector('[data-testid="main-content"]')?.textContent).toBeDefined();
      expect(compiled.querySelector('[data-testid="main-content"]')?.textContent).toContain('AED | 5.04');
    }));
  });
});


describe('AppComponent - test when loading', () => {

  let fixture: ComponentFixture<AppComponent>;
  let debugElement: DebugElement;
  let fakeFetchService: FetchService;

  beforeEach(async () => {

    fakeFetchService = jasmine.createSpyObj<FetchService>(
      'FetchService',
      {
        getData: undefined,
      },
      {
        isLoading: of(true),
        isError: of(false),
        getRates: undefined // of(fakeRates)
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
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('shows loading content', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('[data-testid="loading-header"]')?.textContent).toContain('is loading: true');
  });

  it('hides main content', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('[data-testid="main-content"]')?.textContent).toBeUndefined();
  });

  it('hides error content', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('[data-testid="error-content"]')?.textContent).toBeUndefined();
  });
});

describe('AppComponent - test when error', () => {

  let fixture: ComponentFixture<AppComponent>;
  let debugElement: DebugElement;
  let fakeFetchService: FetchService;

  beforeEach(async () => {

    fakeFetchService = jasmine.createSpyObj<FetchService>(
      'FetchService',
      {
        getData: undefined,
      },
      {
        isLoading: of(false),
        isError: of(true),
        getRates: undefined // of(fakeRates)
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
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('hides loading content', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('[data-testid="loading-header"]')?.textContent).toBeUndefined();
  });

  it('hides main content', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('[data-testid="main-content"]')?.textContent).toBeUndefined();
  });

  it('shows error content', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('[data-testid="error-content"]')?.textContent).toBeDefined();
    expect(compiled.querySelector('[data-testid="error-header"]')?.textContent).toContain('is error: true');
  });

  it('error reload button on click calls reload()', fakeAsync(() => {
    // Arrange
    const component = fixture.componentInstance;
    const reloadMethod = spyOn(component, 'reload');
    const incrementButton = debugElement.query(
      By.css('[data-testid="reload-button"]')
    );

    // Act
    incrementButton.triggerEventHandler('click', null);

    tick();

    // Assert
    expect(reloadMethod).toHaveBeenCalled();
  }));
});



// trying to create a real object fake service is way too complicated.
// several private properties.
// no need either because component has no logic...

    // fakeFetchService = {

    //     _isError$: new BehaviorSubject<boolean>(true),
    //    _isLoading$: new BehaviorSubject<boolean>(true),
    //    _rates$: new BehaviorSubject<IRate[]>([]),


    //   getData(): void {
    //     return;
    //   },

    //   get isLoading(): Observable<boolean> {
    //     return fakeLoading$;
    //   },

    //   get isError(): Observable<boolean> {
    //     return fakeError$;
    //   },

    //   get getRates(): Observable<IRate[]> {
    //     return of(fakeRates);
    //   }
    // };