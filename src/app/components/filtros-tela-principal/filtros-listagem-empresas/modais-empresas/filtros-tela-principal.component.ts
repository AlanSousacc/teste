
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import * as XLSX from 'xlsx'
import { DctfWeb } from 'src/app/services/dctfweb/dctfweb.service'
import { Tributacoes } from 'src/app/services/dctfweb/tributacoes.service'

@Component({
  selector: 'app-filtros-tela-principal',
  templateUrl: './filtros-tela-principal.component.html',
  styleUrls: ['./filtros-tela-principal.component.css']
})
export class FiltrosTelaPrincipalComponent implements OnInit {
  @Input() filtroEmpresas: any
  @Input() idsetor: any
  @Input() idEmpresaCompetencia: any
  @Input() competenciasFilter: any
  @Output() onOpened = new EventEmitter<any>();
  @Input() showFilters: any

  selectedEmpresaFiltro:any
  selectedTarefaFiltro:any
  selectedStatusFiltro:any
  selectedTributacaoFiltro:any
  filters: any
  tarefas: any
  status: any
  tributacao: any
  displayFilters: boolean
  selectedFilterCompetencia: any
  data: any

  constructor (private dctfWebService: DctfWeb, private tributacoesService: Tributacoes) {
    this.filters = {}
    this.tarefas = [
      { name: 'Conferência', value: '1' },
      { name: 'DARF', value: '2' },
      { name: 'DARF Complementar', value: '3' },
      { name: 'EFD-REINF', value: '4' },
      { name: 'DCTF-WEB', value: '5' },
      { name: 'eSocial', value: '6' },
      { name: 'Desobrigada (Declarações)', value: '7' },
      { name: 'RH Externo', value: '8' },
      { name: 'Sem Folha', value: '9' },
      { name: 'Sem retenção de INSS', value: '10' }
    ]

    this.status = [
      { name: 'Marcados/Concluidos', value: '1' },
      { name: 'Não marcados/Não Concluidos', value: '2' }
    ]

    this.tributacao = [
    ]
    this.displayFilters = false
  }

  ngOnInit (): void {
    this.getTributacoes()
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

  setClear (setClear: any) {
    delete this.filters[setClear]
  }

  search () {
    this.dctfWebService.getListaEmpresasDctf(this.filters).subscribe(
      (data: any) => {

      })
  }

  showFitlers () {
    this.displayFilters = !this.displayFilters
    this.onOpened.emit(this.displayFilters)
  }

  onHide () {
    this.onOpened.emit(false)
  }

  findByCompetencia () {
    this.data = []
    const objSend = {
      id_empresa_competencia: this.selectedFilterCompetencia
    }
    this.idsetor = 8
    this.dctfWebService.getDctfCompetenciasFindBy(objSend).subscribe(
      (competencias: any) => {
        this.data = competencias.data
      })
  }


  setFilter (nameFilter: string, value:any) {
    // eslint-disable-next-line prefer-const
    if (value == null) {
      this.filters[nameFilter] = delete this.filters[nameFilter]
    }
    this.filters[nameFilter] = value
  }
}