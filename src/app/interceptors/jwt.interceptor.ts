import { Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http'
import { Observable } from 'rxjs'
import { JWTService } from '../services/global/jwt.service'
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor (private jwtService: JWTService) { }
  intercept (request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isExpired = this.jwtService.isExpired()

    if (isExpired) {
      // TODO: redirecionar login
    // return
    }
    const token = this.jwtService.token()
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
    return next.handle(request)
  }
}