import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);

  return next(req).pipe(
    catchError((err) => {

      if (err.status === 401) {
        alert('Unauthorized');
        router.navigate(['/login']);
      }

      if (err.status === 404) alert('Not found');
      if (err.status === 500) alert('Server error');

      return throwError(() => err);
    })
  );
};
