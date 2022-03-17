import { Component, OnInit } from '@angular/core'
import { DctfWeb } from 'src/app/services/dctfweb/dctfweb.service'

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {
  products: any
  competencias: any
  idsetor: any

  constructor (private dctfWebService: DctfWeb) {
    this.idsetor = 8
  }

  ngOnInit (): void {
    this.dctfWebService.getAllDctfCompetencias().subscribe((data: any) => {
      this.competencias = data
      console.log(this.competencias)
    })
  }
}
