import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ListempresasdctfComponent } from './listempresasdctf.component'

const routes: Routes = [
  {
    path: '',
    component: ListempresasdctfComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
