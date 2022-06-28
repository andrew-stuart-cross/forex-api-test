import { Component, ViewEncapsulation } from '@angular/core';
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

  constructor(readonly _fetchService: FetchService) { }

  ngOnInit(): void {
    this._getData();
  }

  private _getData(): void {
    this._fetchService.getData();
  }

  public reload(): void {
    this._getData();
  }
}
