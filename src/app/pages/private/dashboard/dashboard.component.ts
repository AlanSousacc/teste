import { DctfWeb } from './../../../services/dctfweb/dctfweb.service'
import { Component, OnInit } from '@angular/core'
import { Paginator } from 'primeng/paginator'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currenpage:any
  competencias: any
  idsetor: any
  last = 0
  currentlast = 0
  counttotaldata=1000
  semdados=false
  constructor (private dctfWebService: DctfWeb) { }

  async ngOnInit () {
    await this.setUpTable()
  }

  async setUpTable () {
    this.competencias = []
    this.idsetor = 8
    this.dctfWebService.getAllDctfCompetencias().subscribe(
      (competencias: any) => {
        this.counttotaldata = competencias.total
        console.log(competencias.data)
        competencias.data.forEach((competencia: any) => {
          this.currenpage = competencias
          this.competencias = competencias.data
          this.assertCountItems(competencias)
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

  loadNextPage (params: any) {
    this.currentlast = params.last
    this.last += 10
    params.table.loading = true
    this.competencias = []
    this.dctfWebService.getPageLink(this.currenpage.next_page_url).subscribe(
      (competencias: any) => {
        this.assertCountItems(competencias)
        this.counttotaldata = competencias.total
        competencias.data.forEach((competencia: Paginator | any) => {
          this.currenpage = competencias
          this.competencias.push(competencia)
          params.table.loading = false
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
      })
    })
  }

  loadBackPage (params: any) {
    this.currentlast = params.last
    this.last -= 10
    params.table.loading = true
    this.competencias = []
    this.dctfWebService.getPageLink(this.currenpage.prev_page_url).subscribe(
      (competencias: any) => {
        this.assertCountItems(competencias)
        competencias.data.forEach((competencia: any) => {
          this.counttotaldata = competencias.total
          this.currenpage = competencias
          this.competencias.push(competencia)
          params.table.loading = false
        })
      }
    )
  }
}
