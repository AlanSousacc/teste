
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import * as XLSX from 'xlsx'
import { DctfWeb } from 'src/app/services/dctfweb/dctfweb.service'
import { Tributacoes } from 'src/app/services/dctfweb/tributacoes.service'
@Component({
  selector: 'app-filtros-listagem-empresas',
  templateUrl: './filtros-listagem-empresas.component.html',
  styleUrls: ['./filtros-listagem-empresas.component.css']
})
export class FiltrosListagemEmpresasComponent implements OnInit {
  @Input() filtroEmpresas: any
  @Input() idEmpresaCompetencia: any
  @Output() onFiltred = new EventEmitter<any>();

  selectedEmpresaFiltro:any
  selectedTarefaFiltro:any
  selectedStatusFiltro:any
  selectedTributacaoFiltro:any
  filters: any
  tarefas: any
  status: any
  tributacao: any
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
    alert('clear')
    delete this.filters[setClear]
  }

  search () {
    this.dctfWebService.getListaEmpresasDctf(this.filters).subscribe(
      (data: any) => {
        this.onFiltred.emit(data)
      })
  }

  setFilter (nameFilter: string, value:any) {
    alert(value)
    // eslint-disable-next-line prefer-const
    if (value == null) {
      this.filters[nameFilter] = delete this.filters[nameFilter]
    }
    this.filters[nameFilter] = value
  }
}