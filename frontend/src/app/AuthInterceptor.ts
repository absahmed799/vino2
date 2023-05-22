import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', "Bearer " + this.getBearerToken())
    });
    return next.handle(authReq);
  }

  private getBearerToken() {
    // Récupérez votre jeton d'authentification ici
    return sessionStorage.getItem('bearer_token');
  }
}
