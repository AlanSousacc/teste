import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private storage: Storage;
  constructor () {
    this.storage = window.localStorage
  }

  set (key: string, value: any) {
    this.storage.setItem(key, JSON.stringify(value))
  }

  get (key: string) {
    // eslint-disable-next-line no-empty
    const stringPayload = this.storage.getItem(key)
    if (stringPayload) {
      return JSON.parse(stringPayload)
    }
    return false
  }

  remove (key: string) {
    this.storage.removeItem(key)
  }

  clear () {
    this.storage.clear()
  }
}
