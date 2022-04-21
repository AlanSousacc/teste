/* eslint-disable no-empty */

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import * as XLSX from 'xlsx'
import { DctfWeb } from 'src/app/services/dctfweb/dctfweb.service'
import { Tributacoes } from 'src/app/services/dctfweb/tributacoes.service'
import { NgxSpinnerService } from 'ngx-spinner'
import { Usuarios } from 'src/app/services/dctfweb/usuarios.service'
import { LocalStorageService } from 'src/app/services/dctfweb/localstorage.service'
@Component({
  selector: 'app-filtros-listagem-empresas',
  templateUrl: './filtros-listagem-empresas.component.html',
  styleUrls: ['./filtros-listagem-empresas.component.css'],
  providers: [NgxSpinnerService]
})
export class FiltrosListagemEmpresasComponent implements OnInit {
  @Input() filtroEmpresas: any
  @Input() idEmpresaCompetencia: any
  @Input() showFilters: any
  @Input() idsetor: any
  @Output() onOpened = new EventEmitter<any>();
  @Output() onFiltred = new EventEmitter<any>();
  @Output() changedTableColumns = new EventEmitter<any>();
  @Output() visibilidadeSetores = new EventEmitter<any>();

  selectedEmpresaFiltro:any
  selectedTarefaFiltro:any
  selectedStatusFiltro:any
  selectedTributacaoFiltro:any
  selectedUsuarioExecutor:any

  setoresVisibilidade: any

  filters: any
  tarefas: any
  status: any
  tributacao: any
  usuariosExecutores: any
  searchString: string
  selectedColumnsTable: any
  constructor (private dctfWebService: DctfWeb, private tributacoesService: Tributacoes, private loading: NgxSpinnerService, private usuariosService: Usuarios, private localStorage: LocalStorageService) {
    this.filters = {}
    this.tarefas = [
      { name: 'Conferência (RH)', value: '1' },
      { name: 'DARF (RH - Controller)', value: '2' },
      { name: 'DARF Complementar (RH - Controller)', value: '3' },
      { name: 'EFD-REINF (Fiscal)', value: '4' },
      { name: 'DCTF-WEB (Declarações)', value: '5' },
      { name: 'eSocial (RH)', value: '6' },
      { name: 'Desobrigada (Declarações)', value: '7' },
      { name: 'RH Externo (RH)', value: '8' },
      { name: 'Sem Folha (RH)', value: '9' },
      { name: 'Sem retenção de INSS (Fiscal)', value: '10' }
    ]

    this.status = [
      { name: 'Marcados/Concluidos', value: '1' },
      { name: 'Não marcados/Não Concluidos', value: '2' }
    ]

    this.processaVibibilidadeSetoresSelecionados()

    this.setoresVisibilidade = [
      { name: 'Declarações/RH', value: '1', kay: 'declaracoes-rh' },
      { name: 'RH', value: '2', kay: 'rh' },
      { name: 'Fiscal/Retenções', value: '3', kay: 'fiscal-retencao' },
      { name: 'Declarações', value: '4', kay: 'declaracoes' },
      { name: 'RH - Controller', value: '5', kay: 'rh-controller' }
    ]

    this.tributacao = [
    ]
    this.showFilters = false
    this.searchString = ''
  }

  processaVibibilidadeSetoresSelecionados () {
    // Função responsavel trazer do localstorage se existir uma preferencia de colunas selecionadas a serem exibidas
    const payloadLocalStorage = this.localStorage.get('colunas_listagem_empresas')
    if (payloadLocalStorage && typeof payloadLocalStorage === 'object') {
      this.selectedColumnsTable = payloadLocalStorage
    } else {
      const objSetoresDefault = [
        { name: 'Declarações/RH', value: '1', kay: 'declaracoes-rh' },
        { name: 'RH', value: '2', kay: 'rh' },
        { name: 'Fiscal/Retenções', value: '3', kay: 'fiscal-retencao' },
        { name: 'Declarações', value: '4', kay: 'declaracoes' },
        { name: 'RH - Controller', value: '5', kay: 'rh-controller' }
      ]
      this.localStorage.set('colunas_listagem_empresas', objSetoresDefault)
      this.selectedColumnsTable = objSetoresDefault
    }
  }

  ngOnInit (): void {
    this.getTributacoes()
    this.getUsuariosExecutor()
    this.setFilter('id_empresa_competencia', this.idEmpresaCompetencia)
  }

  getTributacoes () {
    this.tributacoesService.getTributacoes(this.filters).subscribe(
      (data: any) => {
        this.tributacao = data.data.map((x: any) => {
          return { name: x.regime_tributacao, value: x.id_regime_tributacao }
        })
      })
  }

  getUsuariosExecutor () {
    const objSend = {
      id_setor: this.idsetor
    }
    this.usuariosService.getUsuariosAtivosBySetor(objSend).subscribe(
      (data: any) => {
        this.usuariosExecutores = data.data.map((x: any) => {
          return { name: x.nome, value: x.id_usuarios }
        })
      })
  }

  onClearFields (setClear: any) {
    delete this.filters[setClear]
    this.search()
  }

  onHide () {
    this.onOpened.emit(false)
  }

  searchData () {
    this.dctfWebService.getListaEmpresasDctf(this.filters, this.searchString).subscribe(
      (data: any) => {
        this.loading.hide('loading')
        this.onFiltred.emit(data)
      })
  }

  setVisibilidateColunas (colunas: any) {
    this.localStorage.set('colunas_listagem_empresas', this.selectedColumnsTable)
    this.changedTableColumns.emit(true)
  }

  setDefaultStatusTarefa () {
    if (!this.selectedStatusFiltro) {
      this.selectedStatusFiltro = { name: 'Marcados/Concluidos', value: '1' }
    }
  }

  clearFilter () {
    this.filters = {}
    this.selectedEmpresaFiltro = []
    this.selectedTarefaFiltro = []
    this.selectedStatusFiltro = []
    this.selectedTributacaoFiltro = []
    this.selectedUsuarioExecutor = []
    this.setFilter('id_empresa_competencia', this.idEmpresaCompetencia)
    this.search()
  }

  showFiltersTrigger () {
    this.showFilters = !this.showFilters
    this.selectedEmpresaFiltro = {}
  }

  search (showLoading: boolean = false) {
    if (showLoading) {
      this.loading.show('loading')
    }
    this.dctfWebService.getListaEmpresasDctf(this.filters).subscribe(
      (data: any) => {
        this.loading.hide('loading')
        this.onFiltred.emit(data)
      })
  }

  setFilter (nameFilter: string, value:any) {
    // eslint-disable-next-line prefer-const
    if (value == null) {
      this.filters[nameFilter] = delete this.filters[nameFilter]
    }
    this.filters[nameFilter] = value
    this.search()
  }
}
