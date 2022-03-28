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
  @Input() competenciaModal: any
  @Input() competenciaModalStatusCompetencia: any
  @Input() empresasModal: any
  @Output() closedModalCreateEmpresa = new EventEmitter<any>(); // -> usado emitir envento de close do modal create empresa
  @Output() closeModalstatusCompetencia = new EventEmitter<any>(); // -> usado emitir envento de close do modal chang status competencia
  @Output() onchangData = new EventEmitter<any>();
  loadingProcessingStatus: boolean
  selectedOptionEmpresa: any
  modalcreate: any;
  selectedEmpresaModalCreate: any

  constructor (private dctfWebService: DctfWeb, private messageService: MessageService, private primengConfig: PrimeNGConfig) {
    this.competenciaModal = {
      id_empresa_competencia: 1
    }
    this.competenciaModalStatusCompetencia = {
      id_empresa_competencia: 1
    }
    this.displaymodalstatusCompetencia = false
    this.displayModalCreateEmpresa = false
    this.loadingProcessingStatus = false
  }

  ngOnInit (): void {
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

    this.getEmpresasModal()
  }

  updateStatusDctf () {
    const objSend = {
      id_empresa_competencia: this.competenciaModalStatusCompetencia.id_empresa_competencia,
      status: this.competenciaModalStatusCompetencia.status
    }
    this.loadingProcessingStatus = true
    this.dctfWebService.updateStatusCompetencias(objSend).subscribe(
      data => this.sucessMessage(),
      err => console.log(err)
    )
    this.emitCloseModalStatusEmpresa()
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

  sucessMessage () {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Empresa cadastrada no sistema'})
    this.loadingProcessingStatus = false
    this.emitCloseModalCreateEmpresa()
    this.onchangData.emit(true)
  }

  salvarDctf () {
    const objSend = this.competenciaModal
    this.dctfWebService.createEmpresa(objSend).subscribe(
      data => this.sucessMessage(),
      err => console.log(err)
    )
  }
}
