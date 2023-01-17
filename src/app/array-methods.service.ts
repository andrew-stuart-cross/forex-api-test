import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArrayMethodsService {

  constructor() { }

  public hello(): void {

    console.log([4, 5, 6, 7].at(1));
    console.log([4, 5, 6, 7].push(8));
    console.log([4, 5, 6, 7].pop());
    console.log([4, 5, 6, 7].fill(1));
    console.log([4, 5, 6, 7].join(' '));
    console.log([4, 5, 6, 7].shift());
    console.log([4, 5, 6, 7].reverse());
    console.log([4, 5, 6, 7].unshift(3));
    console.log([4, 5, 6, 7].includes(6));
    console.log([4, 5, 6, 7].map(item => 2 * item));

    console.log([4, 5, 6, 7].filter(item => item > 5));
    console.log([4, 5, 6, 7].find(item => item > 5));
    console.log([4, 5, 6, 7].every(item => item > 0));
    console.log([4, 5, 6, 7].findIndex(item => item === 5));
    console.log([4, 5, 6, 7].reduce((prev, curr) => prev + curr, 0));


  }

}
