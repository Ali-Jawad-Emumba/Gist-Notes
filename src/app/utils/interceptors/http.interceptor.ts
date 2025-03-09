import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const token = environment.githubToken;
  let interceptedReq = req;
  if (req.headers.has('skipAuth')) {
    interceptedReq = req.clone({ headers: req.headers.delete('skipAuth') }); //skipAuth is a custom header to skip authorization
  } else {
    if (token) {
      interceptedReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }
  }
  return next(interceptedReq);
};
