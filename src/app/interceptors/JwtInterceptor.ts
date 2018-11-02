import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private _auth: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = req.clone();

    request.headers.append('Authorization', this._auth.getToken());

    return next.handle(request);
  }
}
