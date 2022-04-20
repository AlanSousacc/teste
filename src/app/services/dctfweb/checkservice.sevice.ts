import { environment } from './../../../environments/environment'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { PaginatorDcftCompetencias } from 'src/app/interfaces/dctfweb/DctfCompetencias'
import { Paginator } from 'primeng/paginator'
import { Observable } from 'rxjs'
import { SessionService } from '../global/session.service'

@Injectable({
  providedIn: 'root'
})
export class CheckService {
  session: any
  constructor (private http: HttpClient, private sessionService: SessionService) {
    this.session = this.sessionService.session
    console.log('sesao sendo utilizada')
    console.log(this.sessionService.session)
  }

  getAllDctfCompetencias () { return this.http.get<PaginatorDcftCompetencias>(environment.apiUrl + 'check') }

  checkSemFolha (objSend: any) {
    // Params id_empresa_dctf,sem_folha
    return this.http.post<any>(environment.apiUrl + 'check/setsemfolha', objSend, { headers: { userid: this.session.id_usuario } })
  }

  checkGravarRhInterno (objSend: any) {
    // Prams id_empresa_dctf
    return this.http.post<any>(environment.apiUrl + 'check/setrhinterno', objSend, { headers: { userid: this.session.id_usuario } })
  }

  checkGravarCheckEsocial (objSend: any) {
    // Prams id_empresa_dctf
    return this.http.post<any>(environment.apiUrl + 'check/setcheckesocial', objSend, { headers: { userid: this.session.id_usuario } })
  }

  checkGravarRetEsocial (objSend: any) {
    // Prams id_empresa_dctf
    return this.http.post<any>(environment.apiUrl + 'check/setretesocial', objSend, { headers: { userid: this.session.id_usuario } })
  }

  checkGravarCheckEfd (objSend: any) {
    return this.http.post<any>(environment.apiUrl + 'check/setretesocial', objSend, { headers: { userid: this.session.id_usuario } })
  }

  gravarCheckEfd (objSend: any) {
    return this.http.post<any>(environment.apiUrl + 'check/setcheckefd', objSend, { headers: { userid: this.session.id_usuario } })
  }

  gravarCheckEmpresaSemRetencaoINSS (objSend: any) {
    return this.http.post<any>(environment.apiUrl + 'check/setchecksemretencainss', objSend, { headers: { userid: this.session.id_usuario } })
  }

  getPageLink (pageurl: string, objSend = {}):Observable<Paginator> {
    const url = pageurl
    return this.http.get<any>(url, { params: objSend, headers: { userid: this.session.id_usuario } })
  }

  
}
