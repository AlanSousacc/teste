
import { Component, OnInit, Input } from '@angular/core'
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-filtros-listagem-empresas',
  templateUrl: './filtros-listagem-empresas.component.html',
  styleUrls: ['./filtros-listagem-empresas.component.css']
})
export class FiltrosListagemEmpresasComponent implements OnInit {
  @Input() filtroEmpresas: any
  selectedEmpresaFiltro:any
  selectedTarefaFiltro:any
  selectedStatusFiltro:any
  selectedTributacaoFiltro:any
  filters: any
  tarefas: any
  status: any
  tributacao: any
  constructor () {
    this.filters = {

    }
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
      { name: 'Estimativa', value: '1' },
      { name: 'Imune do IRPJ', value: '2' },
      { name: 'Lucro Arbitrado', value: '3' },
      { name: 'Lucro Presumido', value: '4' },
      { name: 'Não Configurado', value: '5' },
      { name: 'Regime Especial de Tributação', value: '6' }
    ]
  }

  ngOnInit (): void {
  }
}
