import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { IError } from '../../interfaces/global/IError'

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private _error: BehaviorSubject<IError> = new BehaviorSubject<IError>({} as IError)

  get error (): IError {
    return this._error.value
  }

  set error (error: IError) {
    this._error.next(error)
  }

  private _errors: BehaviorSubject<IError[]> = new BehaviorSubject<IError[]>([] as IError[])

  get errors (): IError[] {
    return this._errors.value
  }

  set errors (error: IError[]) {
    this._errors.next(error)
  }
}
