import { Injectable } from '@angular/core'
import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class JWTService {
    private helper = new JwtHelperService();

    constructor (
    ) { }

    public token (): string {
      return localStorage.getItem('token') ?? ''
    }

    public isExpired (): boolean {
      return this.helper.isTokenExpired(this.token()) ?? false
    }

    public decodeToken (): object {
      return this.helper.decodeToken(this.token())
    }

    public decodeTokenAsync (): Promise<any> {
      return new Promise((resolve, reject) => {
        const decode = this.helper.decodeToken(this.token())
        if (decode) {
          resolve(decode)
        } else {
          reject(new Error('Failed decode.'))
        }
      })
    }

    public tokenExpirationDate (): Date {
      return this.helper.getTokenExpirationDate(this.token()) ?? new Date()
    }
}
