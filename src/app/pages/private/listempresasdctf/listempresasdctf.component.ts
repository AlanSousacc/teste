
import { DctfWeb } from '../../../services/dctfweb/dctfweb.service'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { SessionService } from 'src/app/services/global/session.service'
import { MessageService } from 'primeng/api'
import { NgxSpinnerService } from 'ngx-spinner'
import { Paginator } from 'primeng/paginator'

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
  payloadModalEditEmpresaDctf: any
  showFilters: boolean
  filterEmpresas: any
  last = 0
  currentlast = 0
  semdados: boolean
  idEmpresaCompetencia: any
  constructor (private dctfWebService: DctfWeb, private route: ActivatedRoute, private sessionService: SessionService, private messageService: MessageService, private spinner: NgxSpinnerService) {
    this.displaymodalEdicaoEmpresaDctf = false
    this.showFilters = false
    this.totaldata = 0
    this.semdados = false
  }

  async ngOnInit () {
    this.data = [
      {
        code: 'dwwd',
        name: 'sqs',
        category: 'dwwd',
        quantity: 'ddwd'
      }
    ]
    this.getList()
    this.getFilterEmpresas()
    this.idEmpresaCompetencia = this.route.snapshot.paramMap.get('id')
  }

  async getFilterEmpresas() {
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

  showFiltersTrigger  () {
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

  showModalEdit (rowData: any) {
    this.payloadModalEditEmpresaDctf = rowData
    this.displaymodalEdicaoEmpresaDctf = true
  }

  closedModalEditDctf () {
    this.displaymodalEdicaoEmpresaDctf = false
  }

  onchangData () {

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

  setFiltredData(data: any) {
    data.data.map((x: any) => {
      x = this.parseBooleanChecks(x)
      return x
    })
    this.data = data
  }

  errorMessage(errorMessage: string) {
    this.messageService.add({ severity: 'error', summary: 'Erro', detail: errorMessage })
  }
}
