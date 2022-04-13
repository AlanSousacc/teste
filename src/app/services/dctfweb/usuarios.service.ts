import { environment } from './../../../environments/environment'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Paginator } from 'primeng/paginator'
import { Observable } from 'rxjs'
import { SessionService } from '../global/session.service'

@Injectable({
  providedIn: 'root'
})
export class Usuarios {
  session: any
  constructor (private http: HttpClient, private sessionService: SessionService) {
    this.session = this.sessionService.session
    console.log('sesao sendo utilizada')
    console.log(this.sessionService.session)
  }

  getUsuariosAtivosBySetor (objSend: any):Observable<Paginator> {
    return this.http.post<any>(environment.apiUrl + 'dctfweb/getusuariosativosbysetor', objSend, { headers: { userid: this.session.id_usuario } })
  }
}
