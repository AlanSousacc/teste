import { environment } from './../../../environments/environment'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { PaginatorDcftCompetencias } from 'src/app/interfaces/dctfweb/DctfCompetencias'
import { SessionService } from '../global/session.service'

@Injectable({
  providedIn: 'root'
})
export class Tributacoes {
  session: any
  constructor (private http: HttpClient, private sessionService: SessionService) {
    this.session = this.sessionService.session
    console.log('sesao sendo utilizada')
    console.log(this.sessionService.session)
  }

  getTributacoes (objSend: any) {
    return this.http.get<PaginatorDcftCompetencias>(environment.apiUrl + 'tributacoes', { params: objSend, headers: { userid: this.session.id_usuario }})
  }
}
