import { Component } from '@angular/core';
import { FetchService } from './fetch.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'forex-api-test';

  constructor(readonly _fetchService: FetchService) { }

  ngOnInit(): void {
    this._fetchService.fetchList();
  }
}
