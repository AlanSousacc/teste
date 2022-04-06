import { environment } from './../../../environments/environment'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { PaginatorDcftCompetencias } from 'src/app/interfaces/dctfweb/DctfCompetencias'
import { Paginator } from 'primeng/paginator'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class DctfWeb {
  constructor (private http: HttpClient) {

  }

  getAllDctfCompetencias () { return this.http.get<PaginatorDcftCompetencias>(environment.apiUrl + 'dctfweb') }

  getDctfCompetenciasFindBy (objSend: any) {
    return this.http.get<PaginatorDcftCompetencias>(environment.apiUrl + 'dctfweb', { params: objSend })
  }

  getPageLink (pageurl: string):Observable<Paginator> {
    const url = pageurl
    return this.http.get<any>(url)
  }

  searchCompetencias (stringSearch: string):Observable<Paginator> {
    return this.http.post<any>(environment.apiUrl + 'dctfweb/search', { stringSearch: stringSearch })
  }

  updateStatusCompetencias (objSend: any):Observable<Paginator> {
    return this.http.post<any>(environment.apiUrl + 'dctfweb/updatestatuscompetencia', objSend)
  }

  createEmpresa (objSend: any):Observable<Paginator> {
    return this.http.post<any>(environment.apiUrl + 'dctfweb/createempresadctf', objSend)
  }

  updateEmpresaDctf (objSend: any):Observable<Paginator> {
    return this.http.post<any>(environment.apiUrl + 'dctfweb/updateempresadctf', objSend)
  }

  getEmpresasModal (objSend: any):Observable<Paginator> {
    return this.http.post<any>(environment.apiUrl + 'dctfweb/empresasmodal', objSend)
  }

  getAllDctfCompetenciasReport () { return this.http.get<PaginatorDcftCompetencias>(environment.apiUrl + 'dctfweb??page=' + '1000') }

  gerarCompetencia (objSend: any):Observable<Paginator> {
    return this.http.post<any>(environment.apiUrl + 'dctfweb/gerarcompetencia', objSend)
  }

  getCompetencia ():Observable<Paginator> {
    return this.http.get<any>(environment.apiUrl + 'dctfweb/getcompetencias')
  }

  getListaEmpresasDctf (objSend: any):Observable<Paginator> {
    return this.http.get<any>(environment.apiUrl + 'dctfweb/listaempresasdctf', { params: objSend })
  }
}
