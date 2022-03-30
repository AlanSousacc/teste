import { DctfWeb } from './../../services/dctfweb/dctfweb.service'
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core'

import { CompetenciasDcft } from 'src/app/interfaces/dctfweb/DctfCompetencias'
import { MessageService, PrimeNGConfig } from 'primeng/api'
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-table-component',
  templateUrl: './table-component.component.html',
  styleUrls: ['./table-component.component.css'],
  providers: [MessageService]
})
export class TableComponentComponent implements OnInit {
  @Input() last: number;
  @Input() currentlast: number;
  @Input() totaldata: number; // -> usado para paginar, recebe o valor total de registros
  @Input() data = [];
  @Input() idresponsavel: number
  @Input() idsetor:any;
  cities: any
  selectedCityCode: string
  displayModal: boolean = false;
  displayModalCreateEmpresa: boolean = false ;
  modalcreate: any;
  searchValue: string
  competenciaModal: any ;
  competenciaModalStatusCompetencia: any ;
  modalstatusCompetencia: boolean = false ;
  modalGerarCompetencia: boolean = false ;
  empresasModal: any;
  dadosModalGeralCompetencia: any
  competenciasFilter: any
  @Output() loadnextpage = new EventEmitter<{last: any, table: any}>(); // -> usado emitir evento de next page, para trazer mais dados
  @Output() loadbackpage = new EventEmitter<{last: any, table: any}>(); // -> usado para emitir event de back page, para voltar algums registros
  @Output() searchdata = new EventEmitter<{value: any}>(); // -> usado para emitir event de pesquisa de dados
  @Output() onchangData = new EventEmitter<any>(); // -> usado para emitir event para recarregar os dados da tabela

  @ViewChild('competencia') inputCompetencia: any;
  @ViewChild('empresa') inputEmpresa: any;
  @ViewChild('status') inputStatus: any;
  @ViewChild('prioridade') inputPrioridade: any;
  @ViewChild('faturamento') inputFatramento: any;
  @ViewChild('comentario') inputComentario: any;

  constructor (private dctfWebService: DctfWeb, private messageService: MessageService, private primengConfig: PrimeNGConfig) {
    this.totaldata = 0
    this.currentlast = 0
    this.idresponsavel = 0
    this.last = 0
    this.totaldata = 0
    this.selectedCityCode = ''
    this.searchValue = ''
    this.competenciaModal = {
      id_empresa_competencia: 1
    }
    this.competenciaModalStatusCompetencia = {
      id_empresa_competencia: 1
    }
  }

  getCompetencias () {
    this.dctfWebService.getCompetencia().toPromise().then(
      (competencias: any) => {
        this.competenciasFilter = competencias.map((x: any) => {
          return { name: x.competencia, value: x.id_empresa_competencia }
        })
      })
  }

  closedModalCreateEmpresa () {
    this.displayModalCreateEmpresa = false
  }

  closeModalstatusCompetencia () {
    this.modalstatusCompetencia = false
  }

  closeModalGerarCompetencia () {
    this.modalGerarCompetencia = false
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
    this.getCompetencias()
  }

  onChangData () {
    this.onchangData.emit(true)
  }

  searchData () {
    this.searchdata.emit({ value: this.searchValue })
  }

  openModalNewEmpresaDctf (competencia: CompetenciasDcft) {
    this.competenciaModal = competencia
    this.displayModalCreateEmpresa = true
  }

  openModalStatusCompetencia (competencia: CompetenciasDcft) {
    this.competenciaModalStatusCompetencia = competencia
    this.modalstatusCompetencia = true
  }

  openModalGerarCompetencia () {
    this.dadosModalGeralCompetencia = {}
    this.modalGerarCompetencia = true
  }

  exportDataToXlsx () {
    /* pass here the table id */
    // const element = document.getElementById('excel-table')
    this.dctfWebService.getAllDctfCompetencias().subscribe(
      (competencias: any) => {
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(competencias.data)

        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

        /* save to file */
        XLSX.writeFile(wb, 'dwawda.xlsx')
      })
  }

  loadPage (event:any, table:any) {
    if (event.first > this.currentlast) {
      this.loadnextpage.emit({ last: event.first, table: table })
    }
    if (event.first < this.currentlast) {
      this.loadbackpage.emit({ last: event.first, table: table })
    }
  }
}
