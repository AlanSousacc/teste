import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private _spinner = new BehaviorSubject<boolean>(false)
  private _title = new BehaviorSubject<string>('')

  constructor () { }

  set spinner (val:boolean) {
    this._spinner.next(val)
  }

  get spinner () {
    return this._spinner.value
  }

  observeSpinner (): Observable<boolean> {
    return this._spinner.asObservable()
  }

  set title (val:string) {
    this._title.next(val)
  }

  get title () {
    return this._title.value
  }
}
