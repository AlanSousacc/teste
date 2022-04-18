
import { DctfWeb } from '../../../services/dctfweb/dctfweb.service'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { SessionService } from 'src/app/services/global/session.service'
import { MessageService } from 'primeng/api'
import { NgxSpinnerService } from 'ngx-spinner'
import { Paginator } from 'primeng/paginator'
import { LocalStorageService } from 'src/app/services/dctfweb/localstorage.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './listempresasdctf.component.html',
  styleUrls: ['./listempresasdctf.component.css'],
  providers: [MessageService]
})
export class ListempresasdctfComponent implements OnInit {
  currenpage: any
  data: any
  totaldata: number
  displaymodalEdicaoEmpresaDctf: boolean
  displaydModalEmailEmpresas: boolean
  payloadModalEditEmpresaDctf: any
  showFilters: boolean
  filterEmpresas: any
  last = 0
  currentlast = 0
  semdados: boolean
  idEmpresaCompetencia: any
  setoresVisibilidade: any
  setoresVisibilidadeValues: any
  constructor (private dctfWebService: DctfWeb, private route: ActivatedRoute, private sessionService: SessionService, private messageService: MessageService, private spinner: NgxSpinnerService, private localStorage: LocalStorageService) {
    this.displaymodalEdicaoEmpresaDctf = false
    this.displaydModalEmailEmpresas = false
    this.showFilters = false
    this.totaldata = 0
    this.semdados = false
  }

  async ngOnInit () {
    this.setoresVisibilidade = [
      { name: 'Declarações/RH', value: '1', kay: 'declaracoes-rh' },
      { name: 'RH', value: '2', kay: 'rh' },
      { name: 'Fiscal/Retenções', value: '3', kay: 'fiscal-retencao' },
      { name: 'Declarações', value: '4', kay: 'declaracoes' },
      { name: 'RH - Controller', value: '5', kay: 'rh-controller' }
    ]
    this.data = [
      {
        code: 'dwwd',
        name: 'sqs',
        category: 'dwwd',
        quantity: 'ddwd'
      }
    ]
    this.setoresVisibilidadeValues = {}
    this.getList()
    this.getFilterEmpresas()
    this.idEmpresaCompetencia = this.route.snapshot.paramMap.get('id')
    this.checkVisibilidadeSetores()
  }

  async getFilterEmpresas () {
    const objSend = {
      id_empresa_competencia: this.route.snapshot.paramMap.get('id'),
      allitems: true
    }
    this.dctfWebService.getListaEmpresasDctf(objSend).subscribe(
      (data: any) => {
        this.filterEmpresas = data.data.map((x: any) => {
          return { name: x.nome_emp, value: x.id_empresa }
        })
      },
      () => {
        this.errorMessage('Um erro ocorreu ao se conectar com o servidor.')
      })
  }

  async getList () {
    const objSend = {
      id_empresa_competencia: this.route.snapshot.paramMap.get('id')
    }
    this.dctfWebService.getListaEmpresasDctf(objSend).subscribe(
      (data: any) => {
        this.totaldata = data.total
        this.currenpage = data
        data.data.map((x: any) => {
          x = this.parseBooleanChecks(x)
          return x
        },
        () => {
          this.errorMessage('Um erro ocorreu ao se conectar com o servidor.')
        })
        this.data = data
      })
  }

  checkVisibilidadeSetores () {
    // Função responsavel por processar a visibilidade das colunas da tabela
    for (const x of this.setoresVisibilidade) {
      this.setoresVisibilidadeValues[x.kay] = this.findVisibilidade(x.kay)
    }
  }

  findVisibilidade (setor :string) {
    // Função responsavel por verificar se esta habilitado a exibição da coluna em questão
    const objStore = this.localStorage.get('colunas_listagem_empresas')
    return !!objStore.find((x: any) => x.kay === setor)
  }

  showFiltersTrigger () {
    this.showFilters = !this.showFilters
  }

  loadPage(event: any, table: any) {
    if (event.first > this.currentlast) {
      this.loadNextPage({ last: event.first, table: table })
    }

    if (event.first < this.currentlast) {
      this.loadBackPage({ last: event.first, table: table })
    }
  }

  async loadNextPage(params: any) {
    const objSend = {
      id_empresa_competencia: this.route.snapshot.paramMap.get('id')
    }
    this.currentlast = params.last
    this.last += 10
    params.table.loading = true
    this.data.data = []
    await this.spinner.show('loading')
    this.dctfWebService.getPageLink(this.currenpage.next_page_url, objSend).subscribe(
      (emp: any) => {
        this.assertCountItems(emp)
        this.totaldata = emp.total
        this.spinner.hide('loading')
        emp.data.forEach((empresa: Paginator | any) => {
          this.currenpage = emp
          empresa = this.parseBooleanChecks(empresa)
          this.data.data.push(empresa)
          params.table.loading = false
        }, () => {
          this.spinner.hide('loading')
          this.errorMessage('Um erro ocorreu ao se conectar com o servidor.')
        })
      })
  }

  async loadBackPage(params: any) {
    const objSend = {
      id_empresa_competencia: this.route.snapshot.paramMap.get('id')
    }
    await this.spinner.show('loading')
    this.currentlast = params.last
    this.last -= 10
    params.table.loading = true
    this.data.data = []
    this.dctfWebService.getPageLink(this.currenpage.prev_page_url, objSend).subscribe(
      (emp: any) => {
        this.assertCountItems(emp)
        this.spinner.hide('loading')
        emp.data.forEach((empresa: any) => {
          this.totaldata = emp.total
          this.currenpage = emp
          empresa = this.parseBooleanChecks(empresa)
          this.data.data.push(empresa)
          params.table.loading = false
        },
        () => {
          this.spinner.hide('loading')
          this.errorMessage('Um erro ocorreu ao se conectar com o servidor.')
        })
      }
    )
  }

  assertCountItems (topicos: any) {
    if (topicos.data.length === 0) {
      this.semdados = true
    } else {
      this.semdados = false
    }
  }

  onOpenedFiltersScreen (value: boolean) {
    this.showFilters = value
  }

  closedModalEditDctf () {
    this.displaymodalEdicaoEmpresaDctf = false
  }

  closedModalEmailEmpresas () {
    this.displaydModalEmailEmpresas = false
  }

  onchangData () {

  }

  showModalEdit (rowData: any) {
    this.payloadModalEditEmpresaDctf = rowData
    this.displaymodalEdicaoEmpresaDctf = true
  }

  deleteEmpresaDctf (rowData: any) {
    const objSend = {
      id_empresa_dctf: rowData.id_empresa_dctf
    }
    this.dctfWebService.deleteEmpresaDctf(objSend).subscribe(() => {
      this.sucessMessage('Empresa excluida com sucesso.')
    },
    () => {
      this.errorMessage('Ouve um erro ao excluir a empresa.')
    }
    )
  }

  changedTableColumns () {
    this.checkVisibilidadeSetores()
  }

  parseBooleanChecks (x: any) {
    x.sem_folha = x.sem_folha === '1'
    x.departamento_pessoal = x.departamento_pessoal === '1'
    x.esocial_check = x.esocial_check === '1'
    x.esocial_ret = x.esocial_ret === '1'
    x.efd_check = x.efd_check === '1'
    x.efd_desobrigar = x.efd_desobrigar === '1'
    x.conferencia_check = x.conferencia_check === '1'
    x.dctf_check = x.dctf_check === '1'
    x.dctf_ret = x.dctf_ret === '1'
    x.dctf_desobrigada = x.dctf_desobrigada === '1'
    x.darf_check = x.darf_check === '1'
    x.darf_comp_check = x.darf_comp_check === '1'
    return x
  }

  setFiltredData (data: any) {
    data.data.map((x: any) => {
      x = this.parseBooleanChecks(x)
      return x
    })
    this.data = data
  }

  errorMessage (errorMessage: string) {
    this.messageService.add({ severity: 'error', summary: 'Erro', detail: errorMessage })
  }

  sucessMessage (stringMessage: string) {
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: stringMessage })
  }
}
