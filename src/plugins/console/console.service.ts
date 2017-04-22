import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';

@Injectable()
export class ConsoleService {
  private subject: BehaviorSubject<any>;

  constructor() {
    this.subject = new BehaviorSubject<any>(undefined);
  }

  getValue(): BehaviorSubject<any> {
    return this.subject;
  }

  /**
   * Set the value to display into the console.
   * @param value {any}
   */
  setValue(value: any) {
    this.subject.next(value);
  }
}
