import { NgModule, ErrorHandler } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http'

import { CgInputTextModule } from './components/cg-input-text/cg-input-text.module'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { DashboardComponent } from './pages/private/dashboard/dashboard.component'
import { PageNotFoundComponent } from './pages/public/page-not-found/page-not-found.component'
import { GlobalErrorHandler } from './guards/global-error-handler'

import { ProgressSpinnerModule } from 'primeng/progressspinner'

const cgModules = [
  CgInputTextModule
]

const primeModules = [
  ProgressSpinnerModule
]
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PageNotFoundComponent
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
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
