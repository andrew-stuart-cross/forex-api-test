import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { FetchService } from './fetch.service';
import { fakeRates } from './unit-test-helpers/rates-helper';

// let fakeLoading$: Observable<boolean>;
// let fakeError$: Observable<boolean>;


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
      schemas: [NO_ERRORS_SCHEMA],
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
    const component = fixture.componentInstance;
    expect(component.title).toEqual('forex-api-test');
  });

  it('should render title', () => {
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
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: FetchService, useValue: fakeFetchService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('shows loading content', () => {
    //const compiled = fixture.nativeElement as HTMLElement;
    //expect(compiled.querySelector('[data-testid="loading-header"]')?.textContent).toContain('is loading: true');

    //fixture.detectChanges();

    // Test without the helper
    const { debugElement } = fixture;
    const loading = debugElement.query(By.css('app-loading'));
    expect(loading).toBeTruthy();

    // Test using the spec-helper function
    const loading1 = findComponent(fixture, 'app-loading');
    expect(loading1).toBeTruthy();
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
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: FetchService, useValue: fakeFetchService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('hides loading content', () => {
    // const compiled = fixture.nativeElement as HTMLElement;
    // expect(compiled.querySelector('[data-testid="loading-header"]')?.textContent).toBeUndefined();
    const { debugElement } = fixture;
    const loading = debugElement.query(By.css('app-loading'));
    expect(loading).toBeFalsy();
  });

  it('hides main content', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('[data-testid="main-content"]')?.textContent).toBeUndefined();
  });

  it('shows error content', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('[data-testid="error-content"]')?.textContent).toBeDefined();
    expect(compiled.querySelector('[data-testid="error-header"]')?.textContent).toContain('......ERROR.......');
    expect(compiled.querySelector('[data-testid="reload-button"]')?.textContent).toBeDefined();
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


/**
 * Finds a nested Component by its selector, e.g. `app-example`.
 * Throws an error if no element was found.
 * Use this only for shallow component testing.
 * When finding other elements, use `findEl` / `findEls` and `data-testid` attributes.
 *
 * @param fixture Fixture of the parent Component
 * @param selector Element selector, e.g. `app-example`
 */
export function findComponent<T>(
  fixture: ComponentFixture<T>,
  selector: string,
): DebugElement {
  return queryByCss(fixture, selector);
}

/**
 * Finds a single element inside the Component by the given CSS selector.
 * Throws an error if no element was found.
 *
 * @param fixture Component fixture
 * @param selector CSS selector
 *
 */
export function queryByCss<T>(
  fixture: ComponentFixture<T>,
  selector: string,
): DebugElement {
  // The return type of DebugElement#query() is declared as DebugElement,
  // but the actual return type is DebugElement | null.
  // See https://github.com/angular/angular/issues/22449.
  const debugElement = fixture.debugElement.query(By.css(selector));
  // Fail on null so the return type is always DebugElement.
  if (!debugElement) {
    throw new Error(`queryByCss: Element with ${selector} not found`);
  }
  return debugElement;
}


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