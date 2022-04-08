
import { Injectable } from '@angular/core'
import { JWTService } from './jwt.service'

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private _session: any

  constructor (private jwtService: JWTService) {
    if (!this.session) {
      this.getSession()
    }
  }

  get session () {
    return this._session
  }

  getSession () {
    this._session = this.jwtService.decodeToken()
  }
}
