import { Component, ViewEncapsulation } from '@angular/core';
import { ArrayMethodsService } from './array-methods.service';
import { FetchService } from './fetch.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ FetchService ],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'forex-api-test';

  constructor(readonly _fetchService: FetchService, private s: ArrayMethodsService) { }

  ngOnInit(): void {
    this.s.hello();
    //this._getData();
  }

  private _getData(): void {
    this._fetchService.getData();
  }

  public reload(): void {
    this._getData();
  }
}
