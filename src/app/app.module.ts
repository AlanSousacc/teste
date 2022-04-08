
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ListempresasdctfComponent } from './pages/private/listempresasdctf/listempresasdctf.component';
import { NgModule, ErrorHandler } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { TableModule } from 'primeng/table'
import { CgInputTextModule } from './components/cg-input-text/cg-input-text.module'
import { ProgressBarModule } from 'primeng/progressbar'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { DashboardComponent } from './pages/private/dashboard/dashboard.component'
import { PageNotFoundComponent } from './pages/public/page-not-found/page-not-found.component'
import { GlobalErrorHandler } from './guards/global-error-handler'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { DropdownModule } from 'primeng/dropdown'
import { DialogModule } from 'primeng/dialog'
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { TableComponentComponent } from './components/table-component/table-component.component'
import { ModaisEmpresaComponent } from './components/modais-empresas/modais-empresa.component'
import { ModaisListagemEmpresasComponent } from './components/modais-listagem-empresas/modais-listagem-empresas.component'
import { ToastModule } from 'primeng/toast'
import { RippleModule } from 'primeng/ripple'
import { CheckboxModule } from 'primeng/checkbox'
import { ToggleButtonModule } from 'primeng/togglebutton'

import { MessagesModule } from 'primeng/messages'
import { MessageModule } from 'primeng/message'
import { FiltrosListagemEmpresasComponent } from './components/filtros-listagem-empresas/modais-empresas/filtros-listagem-empresas.component'

const cgModules = [
  CgInputTextModule
]

const primeModules = [
  ProgressSpinnerModule,
  CheckboxModule,
  ToggleButtonModule,
  ProgressBarModule,
  TableModule,
  ButtonModule,
  InputTextModule,
  DropdownModule,
  DialogModule,
  ToastModule,
  ToastModule,
  RippleModule,
  MessagesModule,
  MessageModule
]
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PageNotFoundComponent,
    ListempresasdctfComponent,
    TableComponentComponent,
    ModaisEmpresaComponent,
    ModaisListagemEmpresasComponent,
    FiltrosListagemEmpresasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ...cgModules,
    ...primeModules
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
