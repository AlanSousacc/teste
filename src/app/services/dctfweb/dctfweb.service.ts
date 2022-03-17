import { environment } from './../../../environments/environment'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { PaginatorDcftCompetencias } from 'src/app/interfaces/dctfweb/DctfCompetencias'

@Injectable({
  providedIn: 'root'
})
export class DctfWeb {
  constructor (private http: HttpClient) {

  }

  getAllDctfCompetencias () { return this.http.get<PaginatorDcftCompetencias>(environment.base_url + 'dctfweb') }
}
