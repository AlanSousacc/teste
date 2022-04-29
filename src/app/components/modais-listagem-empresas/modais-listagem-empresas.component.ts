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
  @Input() displaymodalEmailsEmpresas: boolean
  @Input() payloadModalEditEmpresaDctf: any
  @Input() payloadModalEmailEpresas: any

  @Output() onchangData = new EventEmitter<any>(); // -> usado para emitir evento de mutacao de dados
  @Output() closedModalEditDctf = new EventEmitter<any>();
  @Output() closedModalEmailEmpresas = new EventEmitter<any>();
  loadingProcessingStatus: boolean
  incluir: boolean
  emailInsert: string

  constructor (private dctfWebService: DctfWeb, private messageService: MessageService, private primengConfig: PrimeNGConfig) {
    this.displaymodalEdicaoEmpresaDctf = false
    this.loadingProcessingStatus = false
    this.displaymodalEmailsEmpresas = false
    this.incluir = false
    this.emailInsert = ''
  }

  ngOnInit (): void {

  }

  emitCloseModalEditEmpresaDctf () {
    this.closedModalEditDctf.emit(true)
  }

  updateEmpresaDctf () {
    const objSend = this.payloadModalEditEmpresaDctf
    this.dctfWebService.updateEmpresaDctf(objSend).subscribe(
      data => this.sucessMessage('Empresa atualiza com sucesso.'),
      () => this.errorMessage('Houve um erro ao editar a empresa')
    )
  }

  emitCloseModalEmailEmpresas () {
    this.closedModalEmailEmpresas.emit(true)
    this.incluir = false
    this.emailInsert = ''
  }

  sucessMessage (stringMessage: string) {
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: stringMessage })
    this.loadingProcessingStatus = false
    this.emitCloseModalEditEmpresaDctf()
    this.onchangData.emit(true)
  }

  errorMessage (stringMessage: string) {
    this.messageService.add({ severity: 'error', summary: 'Erro', detail: stringMessage })
    this.loadingProcessingStatus = false
    this.emitCloseModalEditEmpresaDctf()
    this.onchangData.emit(true)
  }

  saveEmail (rowData: any) {
    const objSend = {
      id_empresa_dctf: rowData.id_empresa_dctf,
      email: this.emailInsert
    }

    this.dctfWebService.saveEmailEmpresa(objSend).subscribe(
      data => this.sucessMessage('Empresa atualiza com sucesso.'),
      () => this.errorMessage('Houve um erro ao editar a empresa')
    )
  }

  getEmailEmpresa () {

  }
}
