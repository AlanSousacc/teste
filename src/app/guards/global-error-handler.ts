import { ErrorHandler, Injectable } from '@angular/core'
import { ErrorService } from '../services/global/error.service'
import { IError } from '../interfaces/global/IError'
import { environment } from 'src/environments/environment'
import { IUsuario } from '../interfaces/global/IUsuario'
// import { JWTService } from '../services/globals/jwt.service'
// import { Usuario } from '../interfaces/Usuario'
// import { EnviarEmailService } from '../services/globals/enviar_email.service'
// import { AppService } from '../services/app.service'

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor (
    // private jwt: JWTService,
    // private app: AppService,
    // private emailService: EnviarEmailService,
    private errorService: ErrorService
  ) {}

  handleError (error: Error): any {
    const { message, name, stack } = error

    const erroRepetido = this.errorService.errors.filter(f => f.message === message)

    if (erroRepetido.length === 0) {
      this.errorService.errors.push({
        message: message || '',
        name: name || '',
        stack: stack || ''
      })

      if (!environment.production) {
        console.log('***DEBUGGING ACTIVATED***', this.errorService.errors)
      }

      const customError: IError = {
        ...this.errorService.errors.filter(f => f.message === message)[0],
        path: this.nomeDoProjeto()
      }

      // const usuarioLogado = this.jwt.decodeToken()
      const usuarioLogado = {} as IUsuario

      this.mailErrorTo(customError, usuarioLogado)
        .then(response => {
          console.log(response)
        })

      // this.app.setLoadingText('')
      // this.app.setSpinner(false)
    }
  }

  private mailErrorTo (customError: IError, usuarioLogado: IUsuario): Promise<any> {
    // const message = `
    //     <b>Logged User:</b> ${JSON.stringify(usuarioLogado)} <br>
    //     <b>Path:</b> ${customError.path} <br>
    //     <b>Name:</b> ${customError.name} <br>
    //     <b>Error:</b> ${customError.message}<br>
    //     <b>Stack:</b> ${customError.stack}`
    // return this.emailService.enviar({
    //   assunto: `Erro GLOBAL no ${this.nomeDoProjeto()}`,
    //   descricao: message,
    //   email_from: 'intranet.avisos@cgcontadores.com.br',
    //   nome_from: 'Aviso de Erro',
    //   email_to: ['diego.padilha@cgcontadores.com.br'],
    //   copia: [],
    //   copia_oculta: []
    // }).toPromise()
    return new Promise((resolve, reject) => {
      resolve(true)
      reject(new Error('error'))
    })
  }

  public nomeDoProjeto (): string {
    const urlDoFormulario = window.location.href.replace(environment.siteUrl, '')

    const regex = /app.*(\/#\/)/gm

    const m = regex.exec(urlDoFormulario)

    if (m) {
      return m[0]
    }

    return ''
  }
}
