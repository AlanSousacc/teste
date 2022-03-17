import { environment } from './../../../environments/environment'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class User {
  constructor (private http: HttpClient) {

  }

  getCurrentUser (idUser: any) {
    return this.http.post(environment.base_url + '/getcurrentuser',
      { id_user: idUser })
  }
}
