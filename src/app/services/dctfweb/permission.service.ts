import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { SessionService } from '../global/session.service'

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  session: any
  constructor (private http: HttpClient, private sessionService: SessionService) {
    this.session = this.sessionService.session
    console.log('sesao sendo utilizada')
    console.log(this.sessionService.session)
  }

  getPermissionsDctf (objSend: any) {
    // Params id_empresa_dctf
    return this.http.post<any>(environment.apiUrl + 'permissoes/getpermissoesuser', objSend, { headers: { userid: this.session.id_usuario } })
  }
}
