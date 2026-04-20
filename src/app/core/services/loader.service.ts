import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private subject = new BehaviorSubject(false);
  loading$ = this.subject.asObservable();

  show() { this.subject.next(true); }
  hide() { this.subject.next(false); }
}
