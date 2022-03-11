import { catchError } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
  HttpErrorResponse,
  HttpInterceptor
} from '@angular/common/http'
import { format } from 'date-fns'
import { JWTService } from '../services/global/jwt.service'
import { environment } from 'src/environments/environment'
import { AppService } from '../services/global/app.service'
import { Observable } from 'rxjs'

@Injectable()
export class HttpCustomInterceptor implements HttpInterceptor {
  constructor (private JWT: JWTService,
    private app: AppService) {}

  intercept (request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = this.JWT.token()

    const newHeader: HttpHeaders = this.addTokenToHeader(request, token)

    const changedRequest = request.clone({ headers: newHeader })
    return next.handle(changedRequest)
      .pipe(catchError(err => {
        this.handleError(err, request)
        return new Promise(resolve => { resolve(err) })
      })
      ) as Observable<HttpEvent<any>>
  }

  private addTokenToHeader (request: HttpRequest<any>, token: string): HttpHeaders {
    const headerSettings: {[name: string]: string | string[]; } = {}

    for (const key of request.headers.keys()) {
      headerSettings[key] = request.headers.getAll(key) ?? ''
    }
    if (token) {
      headerSettings.Authorization = 'Bearer ' + token
    }
    // headerSettings['Content-Type'] = 'application/json';
    const newHeader = new HttpHeaders(headerSettings)
    return newHeader
  }

  private handleError (err: HttpErrorResponse, request: HttpRequest<any>) {
    const responseError = err.error.erros
    this.app.actionsForError(responseError !== null || responseError.isArray() ? responseError.join(',') : responseError)
    this.app.setLoadingText('')
    this.app.setSpinner(false)

    if (!environment.production) {
      console.log(err)
      return
    }

    if (err instanceof HttpErrorResponse) {
      /** Check if response.code in (500, 501) */
      const body = request.serializeBody()
        .toString()
        .replace('%7B', '{')
        .replace('%7D', '}')
        .split('%22')
        .join(' ')

      const requestHeders = {
        'Content-Type': request.headers.getAll('Content-Type')
      }
      const acceptedStatus = [500, 501, 400]
      if (acceptedStatus.includes(err.status)) {
        // Mudar o trecho abaixo para em vez de enviar e-mail, chamar um service
        // const message = `
        //     <b>Logged user:</b> ${JSON.stringify(this.JWT.decodeToken())} <br>
        //     <b>Component:</b> ${err.message} <br>
        //     <b>Path:</b> ${err.url} <br>
        //     <b>Status:</b> ${err.status} <br>
        //     <b>Method:</b> ${JSON.stringify(request.method)} <br>
        //     <b>Headers:</b> ${JSON.stringify(requestHeders)} <br>
        //     <b>Body:</b> ${body} <br>
        //     <b>Data:</b> ${err.error.dados === undefined ? '' : JSON.stringify(err.error.dados)}<br>
        //     <b>Error:</b> ${err.error.erros === undefined ? '' : JSON.stringify(err.error.erros)}<br>
        //     <b>Date:</b> ${format(new Date(), 'dd/MM/yyyy HH:mm:ss')}`
        // this.emailService.enviar({
        //   assunto: `Erro HTTP no ${this.nomeDoProjeto()}`,
        //   descricao: message,
        //   email_from: 'diego.padilha@cgcontadores.com.br',
        //   nome_from: 'Diego Padilha',
        //   email_to: ['vanessa.martins@cgcontadores.com.br'],
        //   copia: ['diego.padilha@cgcontadores.com.br'],
        //   copia_oculta: []
        // }).toPromise()
        // console.log(message)
      }
    }
  }

  public nomeDoProjeto (): string {
    const urlDoFormulario = window.location.href.replace(environment.apiUrl, '')

    const regex = /app.*(\/#\/)/gm

    const m = regex.exec(urlDoFormulario)

    if (m) {
      return m[0]
    }

    return ''
  }
}
