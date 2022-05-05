import { environment } from '../../../environments/environment'
import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { SessionService } from '../global/session.service'

@Injectable({
  providedIn: 'root'
})

export class AppxService {
  session: any
  constructor (private http: HttpClient, private sessionService: SessionService) {
    this.session = this.sessionService.session
    console.log('sesao sendo utilizada')
    console.log(this.sessionService.session)
  }

  saveForm (formData: any) {
    // Params id_empresa_dctf,sem_folha
    const HTTPOptions:Object = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text'
    }
    return this.http.post<any>(environment.apiUrl + 'saveformdata', formData, HTTPOptions)
  }
}
