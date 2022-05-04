import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from './guards/auth.guard'
import { PageNotFoundComponent } from './pages/public/page-not-found/page-not-found.component'

const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./pages/private/dashboard/dashboard.module').then(
      module => module.DashboardModule
    ),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: 'listempresas/:id',
    loadChildren: () => import('./pages/private/listempresasdctf/listempresasdctf.module').then(
      module => module.ListempresasdctfModule
    )
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
