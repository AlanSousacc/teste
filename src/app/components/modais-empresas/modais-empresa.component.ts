import { DctfWeb } from './../../services/dctfweb/dctfweb.service'
import { Component, OnInit, Input, EventEmitter, Output, ComponentFactoryResolver } from '@angular/core'
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
      data => this.sucessMessage('Competência atualizada com sucesso'),
      () => this.errorMessage('Houve um erro ao atualizar o status da competência')
    )
    this.emitCloseModalStatusEmpresa()
  }

  gerarCompetencia () {
    this.dadosModalGerarCompetencia.id_usuario_responsavel = this.idresponsavel
    if (!this.validationGerarCompetencia()) {
      return
    }
    this.dctfWebService.gerarCompetencia(this.dadosModalGerarCompetencia).subscribe(
      (data) => {
        this.displayModalGerarCompetencia = false
        this.sucessMessage('Competência gerada com sucesso')
      },
      () => this.errorMessage('Houve um erro ao gerar a competência')
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
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: stringMessage })
    this.loadingProcessingStatus = false
    this.emitCloseModalCreateEmpresa()
    this.onchangData.emit(true)
  }

  errorMessage (stringMessage: string) {
    this.messageService.add({ severity: 'error', summary: 'Erro', detail: stringMessage })
    this.loadingProcessingStatus = false
    this.emitCloseModalCreateEmpresa()
    this.onchangData.emit(true)
  }

  validationSalvarDctf () {
    const ValidadeFields = [{ field: 'id_empresa_competencia', name: 'Empresa' }, { field: 'competencia', name: 'Competencia' }, { field: 'competencia', name: 'Competencia' }]
    let result = true
    for (const x of ValidadeFields) {
      // eslint-disable-next-line no-empty
      if (this.competenciaModal[x.field] === null || this.competenciaModal[x.field].trim() === '') {
        result = false
        this.errorMessage('O campo ' + x.name + ' é obrigatorio')
      }
    }
    return result
  }

  validationGerarCompetencia () {
    const ValidadeFields = [
      { field: 'competencia', name: 'Competencia' },
      { field: 'data_limite_execucao', name: 'Limite execução' },
      { field: 'data_limite_transmissao', name: 'Limite transmissão' },
      { field: 'id_usuario_responsavel', name: 'Usuario responsavel' }
    ]
    let result = true
    // eslint-disable-next-line prefer-const
    for (const x of ValidadeFields) {
      // eslint-disable-next-line no-empty
      this.dadosModalGerarCompetencia[x.field] = typeof this.dadosModalGerarCompetencia[x.field] !== 'number' ? this.dadosModalGerarCompetencia[x.field] : String(this.dadosModalGerarCompetencia[x.field])
      if (this.dadosModalGerarCompetencia[x.field] === null || this.dadosModalGerarCompetencia[x.field]?.trim() === '') {
        result = false
        this.errorMessage('O campo ' + x.name + ' é obrigatorio')
      }
    }
    return result
  }

  salvarDctf () {
    this.competenciaModal.empresa = this.selectedEmpresaModalCreate.value
    const objSend = this.competenciaModal
    if (!this.validationSalvarDctf()) {
      return
    }
    this.dctfWebService.createEmpresa(objSend).subscribe(
      data => this.sucessMessage('Empresa cadastrada no sistema'),
      () => this.errorMessage('Houve um erro ao cadastrar a empresa')
    )
  }
}
