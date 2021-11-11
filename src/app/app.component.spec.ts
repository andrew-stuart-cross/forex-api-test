import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FetchService } from './fetch.service';
import { FetchServiceStub } from './fetch.service.stub';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let debugElement: DebugElement;
  let dependencies: { fetchService: FetchServiceStub };


  beforeEach(async () => {

    dependencies = {
      fetchService: new FetchServiceStub()
    };

    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: FetchService, useValue: dependencies.fetchService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });


  // check if rates are rendered in DOM
  // but don't tie it to testing if service is called, etc

  // if 'retry' button is cliecked, check if getData is called...

  it('should call getData from service init', () => {
    //fixture.detectChanges();  // either call here or in beforeEach() above
    expect(dependencies.fetchService.getData).toHaveBeenCalled();
    expect(dependencies.fetchService.getData).toHaveBeenCalledTimes(1);
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
    expect(compiled.querySelector('[data-testid="increment-button"]')?.textContent).toContain('forex-api-test app is running!');
  });

  it('FGH', () => {

    const userElements = debugElement.query(By.css('.main-title'));
    console.log(userElements);

    //expect(userElements.).to('forex-api-test app is running!');

  });
});
