import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Clona la request para añadir headers
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${localStorage.getItem('authToken') || ''}`
    }
  });
  
  return next(authReq);
};