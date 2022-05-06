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
    let apiUrl: string = 'http://localhost:8000/api/salvar-arquivo-valores';
    const HTTPOptions:Object = {
      responseType: 'text'
    }
    return this.http.post<any>(apiUrl, formData)
  }
  
  download (path: string){
    let apiUrl: string = `http://localhost:8000/api/download-file/${path}`;
    return this.http.get(apiUrl, {responseType: 'blob'});
  }
  
}
