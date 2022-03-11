import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'

interface Scripts {
  name: string;
  src: string;
}

declare let document: any

@Injectable({
  providedIn: 'root'
})
export class DynamicScriptLoaderService {
  public scriptStore: Scripts[] = [
    {
      name: 'fontawesome',
      src: (!environment.production
        ? 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css'
        : `${environment.siteUrl}assets/fontawesome-5.8.2/css/all.css`)
    }
  ]

  private scripts: any = {};

  constructor () {
    this.scriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src
      }
    })
  }

  load (...scripts: string[]) {
    const promises: any[] = []
    scripts.forEach((script) => promises.push(this.loadScript(script)))
    return Promise.all(promises)
  }

  loadScript (name: string) {
    return new Promise((resolve, reject) => {
      if (this.scripts[name]) {
        if (!this.scripts[name].loaded) {
          // load script
          if (this.scripts[name].src.endsWith('.js')) {
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = this.scripts[name].src
            if (script.readyState) { // IE
              script.onreadystatechange = () => {
                if (script.readyState === 'loaded' || script.readyState === 'complete') {
                  script.onreadystatechange = null
                  this.scripts[name].loaded = true
                  resolve({ script: name, loaded: true, status: 'Loaded' })
                }
              }
            } else { // Others
              script.onload = () => {
                this.scripts[name].loaded = true
                resolve({ script: name, loaded: true, status: 'Loaded' })
              }
            }
            script.onerror = (error: any) => resolve({ script: name, loaded: false, status: 'Loaded', error: error })
            document.getElementsByTagName('head')[0].appendChild(script)
          }

          // load css
          if (this.scripts[name].src.endsWith('.css')) {
            const element = document.createElement('link')
            element.rel = 'stylesheet'
            element.href = this.scripts[name].src
            document.getElementsByTagName('head')[0].appendChild(element)
            resolve({ script: name, loaded: true, status: 'Loaded' })
          }
        } else {
          resolve({ script: name, loaded: true, status: 'Already Loaded' })
        }
      } else {
        reject(
          new Error(`${name} does not exist`)
        )
      }
    })
  }
}
