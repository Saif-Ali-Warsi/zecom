import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {

        let errorMessage = 'Something went wrong';

        if (error.status === 0) {
          errorMessage = 'Network error';
        } else if (error.status === 404) {
          errorMessage = 'Data not found';
        } else if (error.status === 500) {
          errorMessage = 'Server error';
        }

        alert(errorMessage);

        return throwError(() => error);
      })
    );
  }
}