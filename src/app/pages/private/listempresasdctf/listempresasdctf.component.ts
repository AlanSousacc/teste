
import { DctfWeb } from '../../../services/dctfweb/dctfweb.service'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { SessionService } from 'src/app/services/global/session.service'
import { MessageService } from 'primeng/api'

@Component({
  selector: 'app-dashboard',
  templateUrl: './listempresasdctf.component.html',
  styleUrls: ['./listempresasdctf.component.css'],
  providers: [MessageService]
})
export class ListempresasdctfComponent implements OnInit {
  currenpage:any
  data:any
  displaymodalEdicaoEmpresaDctf:boolean
  payloadModalEditEmpresaDctf:any
  showFilters:boolean
  filterEmpresas:any
  idEmpresaCompetencia:any
  constructor (private dctfWebService: DctfWeb, private route: ActivatedRoute, private sessionService: SessionService, private messageService: MessageService) {
    this.displaymodalEdicaoEmpresaDctf = false
    this.showFilters = false
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

  showFiltersTrigger () {
    this.showFilters = !this.showFilters
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
}
