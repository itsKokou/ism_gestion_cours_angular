import { HttpInterceptorFn } from '@angular/common/http';
import { AuthentificateService } from '../services/auth/authentificate.service';
import { inject } from '@angular/core';




export const tokenInterceptor: HttpInterceptorFn = (request, next) => {

  const authToken = inject(AuthentificateService).getAuthToken();
        const req=request.clone({
         headers:request.headers.set("Authorization",`Bearer ${authToken}`)
      })
  

  return next(req);
};
