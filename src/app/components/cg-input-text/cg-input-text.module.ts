import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CgInputTextComponent } from './cg-input-text.component'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CgInputTextComponent],
  exports: [CgInputTextComponent]
})
export class CgInputTextModule { }
