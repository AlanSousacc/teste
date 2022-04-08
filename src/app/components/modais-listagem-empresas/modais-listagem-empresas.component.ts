import { DctfWeb } from './../../services/dctfweb/dctfweb.service'
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { MessageService, PrimeNGConfig } from 'primeng/api'
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-modais-listagem-empresas',
  templateUrl: './modais-listagem-empresas.html',
  styleUrls: ['./modais-listagem-empresas.component.css'],
  providers: [MessageService]
})
export class ModaisListagemEmpresasComponent implements OnInit {
  @Input() displaymodalEdicaoEmpresaDctf: boolean
  @Input() payloadModalEditEmpresaDctf: any

  @Output() closedModalEditDctf = new EventEmitter<any>();
  loadingProcessingStatus: boolean

  constructor (private dctfWebService: DctfWeb, private messageService: MessageService, private primengConfig: PrimeNGConfig) {
    this.displaymodalEdicaoEmpresaDctf = false
    this.loadingProcessingStatus = false
  }

  ngOnInit (): void {

  }

  emitCloseModalEditEmpresaDctf () {
    this.closedModalEditDctf.emit(true)
  }

  updateEmpresaDctf () {
    const objSend = this.payloadModalEditEmpresaDctf
    this.dctfWebService.updateEmpresaDctf(objSend).subscribe(
      data => alert('suceso'),
      () => alert('erro')
    )
  }
}
