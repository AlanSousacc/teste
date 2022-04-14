import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/global/auth.service';
import { SpinnerService } from './services/global/spinner.service';
import { DynamicScriptLoaderService } from './services/global/dynamic-script-loader.service';
import { ISpinner } from './interfaces/global/ISpinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'admin';
  spinner: ISpinner = { title: '', show: false }
  public version = '0.1.0';
  public currentYear = new Date().getFullYear();

  constructor (
    private dynamicScriptLoader: DynamicScriptLoaderService,
    private auth: AuthService,
    private spinnerService: SpinnerService,
    private router: Router
  ) {
    if (!this.auth.isAuthenticated()) {
      this.router.navigateByUrl('login')
    }
  }

  ngOnInit () {
    this.loadScripts()
    this.spinnerService.observeSpinner().subscribe(val => {
      this.spinner.show = val
      this.spinner.title = this.spinnerService.title
      if (!val) {
        this.spinner.title = ''
        this.spinnerService.title = ''
      }
    })
  }

  private loadScripts () {
    this.dynamicScriptLoader.load('menuheaderjs', 'menuheadercss', 'fontawesome')
      .then((data: any) => {
        console.log('LoadScripts complete', environment.production ? '' : data)
      })
      .catch((err: any) => {
        // Exibir erro para o usuário.
        console.log(err)
        // this.app.actionsForError(err)
      })
  }
}
