import { DctfWeb } from './../../../services/dctfweb/dctfweb.service'
import { Component, OnInit } from '@angular/core'
import { Paginator } from 'primeng/paginator'
import { SessionService } from 'src/app/services/global/session.service'
import { NgxSpinnerService } from 'ngx-spinner'
import { MessageService } from 'primeng/api'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [MessageService]
})
export class DashboardComponent implements OnInit {
  currenpage:any
  competencias: any
  idsetor: any
  last = 0
  currentlast = 0
  idresponsavel = 1
  counttotaldata=1000
  semdados=false
  constructor (private dctfWebService: DctfWeb, private sessionService: SessionService, private spinner: NgxSpinnerService, private messageService: MessageService) { }

  async ngOnInit () {
    await this.setUpTable()
  }

  async setUpTable () {
    this.competencias = []
    this.idsetor = 8
    await this.spinner.show('loading')
    this.dctfWebService.getAllDctfCompetencias().subscribe(
      (competencias: any) => {
        this.counttotaldata = competencias.total
        console.log(competencias.data)
        competencias.data.forEach((competencia: any) => {
          this.currenpage = competencias
          this.competencias = competencias.data
          this.assertCountItems(competencias)
          this.spinner.hide('loading')
        },
        () => {
          this.spinner.hide('loading')
          this.errorMessage('Um erro ocorreu ao se conectar com o servidor.')
        })
      })
  }

  assertCountItems (topicos: any) {
    if (topicos.data.length === 0) {
      this.semdados = true
    } else {
      this.semdados = false
    }
  }

  onChangData () {
    this.setUpTable()
  }

  restoreSearchEvent () {
    this.setUpTable()
  }

  clearData () {
    this.competencias = []
  }

  async loadNextPage (params: any) {
    this.currentlast = params.last
    this.last += 10
    params.table.loading = true
    this.competencias = []
    await this.spinner.show('loading')
    this.dctfWebService.getPageLink(this.currenpage.next_page_url).subscribe(
      (competencias: any) => {
        this.assertCountItems(competencias)
        this.counttotaldata = competencias.total
        this.spinner.hide('loading')
        competencias.data.forEach((competencia: Paginator | any) => {
          this.currenpage = competencias
          this.competencias.push(competencia)
          params.table.loading = false
        }, () => {
          this.spinner.hide('loading')
          this.errorMessage('Um erro ocorreu ao se conectar com o servidor.')
        })
      })
  }

  searchCompetencia (params: any) {
    this.competencias = []
    if (params.value.trim() === '') {
      this.setUpTable()
    }
    this.dctfWebService.searchCompetencias(params.value).subscribe((competencias: any) => {
      this.assertCountItems(competencias)
      this.counttotaldata = competencias.total
      competencias.data.forEach((competencia: Paginator | any) => {
        this.competencias.push(competencia)
      },
      () => {
        this.spinner.hide('loading')
        this.errorMessage('Um erro ocorreu ao se conectar com o servidor.')
      })
    })
  }

  async loadBackPage (params: any) {
    await this.spinner.show('loading')
    this.currentlast = params.last
    this.last -= 10
    params.table.loading = true
    this.competencias = []
    this.dctfWebService.getPageLink(this.currenpage.prev_page_url).subscribe(
      (competencias: any) => {
        this.assertCountItems(competencias)
        this.spinner.hide('loading')
        competencias.data.forEach((competencia: any) => {
          this.counttotaldata = competencias.total
          this.currenpage = competencias
          this.competencias.push(competencia)
          params.table.loading = false
        },
        () => {
          this.spinner.hide('loading')
          this.errorMessage('Um erro ocorreu ao se conectar com o servidor.')
        })
      }
    )
  }

  errorMessage (errorMessage: string) {
    this.messageService.add({ severity: 'error', summary: 'Erro', detail: errorMessage })
  }
}
