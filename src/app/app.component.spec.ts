import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FetchService } from './fetch.service';
import { FetchServiceStub } from './fetch.service.stub';

describe('AppComponent', () => {

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
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'forex-api-test'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('forex-api-test');
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('forex-api-test app is running!');
  // });
});
