import { DctfWeb } from './../../services/dctfweb/dctfweb.service'
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'
import { MessageService, PrimeNGConfig } from 'primeng/api'
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-modais-empresas',
  templateUrl: './modais-empresa.component.html',
  styleUrls: ['./modais-empresa.component.css'],
  providers: [MessageService]
})
export class ModaisEmpresaComponent implements OnInit {
  @Input() displaymodalstatusCompetencia: boolean
  @Input() displayModalCreateEmpresa: boolean
  @Input() displayModalGerarCompetencia: boolean
  @Input() idresponsavel: number

  @Input() competenciaModal: any
  @Input() competenciaModalStatusCompetencia: any
  @Input() empresasModal: any
  @Output() closedModalCreateEmpresa = new EventEmitter<any>(); // -> usado emitir envento de close do modal create empresa
  @Output() closeModalstatusCompetencia = new EventEmitter<any>(); // -> usado emitir envento de close do modal chang status competencia
  @Output() onchangData = new EventEmitter<any>(); // -> usado para emitir evento de mutacao de dados
  @Output() closeModalGerarCompetencia = new EventEmitter<any>() // -> usado emitir envento de close do modal gerar competencia;
  dadosModalGerarCompetencia: any
  loadingProcessingStatus: boolean
  selectedOptionEmpresa: any
  modalcreate: any;
  selectedEmpresaModalCreate: any

  constructor (private dctfWebService: DctfWeb, private messageService: MessageService, private primengConfig: PrimeNGConfig) {
    this.competenciaModal = {
      id_empresa_competencia: 1
    }
    this.idresponsavel = 0
    this.competenciaModalStatusCompetencia = {
      id_empresa_competencia: 1
    }
    this.displaymodalstatusCompetencia = false
    this.displayModalCreateEmpresa = false
    this.loadingProcessingStatus = false
    this.displayModalGerarCompetencia = false
    this.empresasModal = [
      { name: '11/2021', value: '59' }
    ]

    this.modalcreate = [{
      competencia: '',
      empresa: '',
      status: '',
      prioridade: '',
      faturamento: '',
      comentario: ''
    }]
    this.dadosModalGerarCompetencia = {
      id_usuario_responsavel: null,
      competencia: null,
      data_limite_execucao: null,
      data_limite_transmissao: null
    }
  }

  ngOnInit (): void {
    this.getEmpresasModal()
  }

  updateStatusDctf () {
    const objSend = {
      id_empresa_competencia: this.competenciaModalStatusCompetencia.id_empresa_competencia,
      status: this.competenciaModalStatusCompetencia.status
    }
    this.loadingProcessingStatus = true
    this.dctfWebService.updateStatusCompetencias(objSend).subscribe(
      data => this.sucessMessage('Empresa cadastrada no sistema'),
      err => console.log(err)
    )
    this.emitCloseModalStatusEmpresa()
  }

  gerarCompetencia () {
    this.dadosModalGerarCompetencia.id_usuario_responsavel = this.idresponsavel
    if (!this.validationGerarCompetencia()) {
      alert('erro')
    }
    this.dctfWebService.gerarCompetencia(this.dadosModalGerarCompetencia).subscribe(
      data => this.sucessMessage('Competência gerada com sucesso'),
      err => console.log(err)
    )
  }

  getEmpresasModal () {
    this.dctfWebService.getEmpresasModal({}).toPromise().then(
      (data:any) => { this.empresasModal = data }
    )
  }

  emitCloseModalCreateEmpresa () {
    this.closedModalCreateEmpresa.emit(true)
  }

  emitCloseModalStatusEmpresa () {
    this.closeModalstatusCompetencia.emit(true)
  }

  emitCloseModalGerarCompetencia () {
    this.closeModalGerarCompetencia.emit(true)
  }

  sucessMessage (stringMessage: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: stringMessage })
    this.loadingProcessingStatus = false
    this.emitCloseModalCreateEmpresa()
    this.onchangData.emit(true)
  }

  validationSalvarDctf () {
    const ValidadeItems = ['id_empresa_competencia', 'competencia']
    let result = true
    for (const x of ValidadeItems) {
      // eslint-disable-next-line no-empty
      if (this.competenciaModal[x] === null || this.competenciaModal[x].trim() === '') {
        result = false
      }
    }
    return result
  }

  validationGerarCompetencia () {
    const ValidadeItems = ['competencia', 'data_limite_execucao', 'data_limite_transmissao', 'id_usuario_responsavel']
    let result = true
    for (const x of ValidadeItems) {
      // eslint-disable-next-line no-empty
      if (this.competenciaModalStatusCompetencia[x] === null || this.competenciaModalStatusCompetencia[x].trim() === '') {
        result = false
      }
    }
    return result
  }

  salvarDctf () {
    const objSend = this.competenciaModal
    if (!this.validationSalvarDctf()) {
      alert('erro')
    }
    this.dctfWebService.createEmpresa(objSend).subscribe(
      data => this.sucessMessage('Empresa cadastrada no sistema'),
      err => console.log(err)
    )
  }
}
