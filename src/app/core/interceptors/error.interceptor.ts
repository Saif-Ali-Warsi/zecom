import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);

  return next(req).pipe(

    catchError((error) => {

      let message = 'Something went wrong';

      if (error.status === 0) {
        message = 'Network error';
      } else if (error.status === 401) {
        message = 'Unauthorized - Please login again';
        router.navigate(['/login']);
      } else if (error.status === 404) {
        message = 'Data not found';
      } else if (error.status === 500) {
        message = 'Server error';
      }

      alert(message);

      return throwError(() => error);
    })
  );
};