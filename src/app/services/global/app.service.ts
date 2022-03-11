import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import * as toastr from 'toastr'

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private _loadingText = new BehaviorSubject<any>('Inicializando ambiente...')
  public loadingText = this._loadingText.asObservable()

  private _spinner = new BehaviorSubject<any>(false)
  public spinner = this._spinner.asObservable()

  constructor () { }

  setLoadingText (val:string) {
    this._loadingText.next(val)
  }

  setSpinner (val:boolean) {
    this._spinner.next(val)
  }

  actionsForError (error = 'Ocorreu um erro ao processar a sua solicitação!'): void {
    toastr.error(error, '', { timeOut: 0, extendedTimeOut: 0 })
  }

  actionForSuccess (msg = 'Solicitação efetuada com sucesso!'): void {
    toastr.success(msg)
  }
}
