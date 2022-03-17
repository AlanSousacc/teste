import { DctfWeb } from './../../../services/dctfweb/dctfweb.service';
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  competencias: any
  idsetor: any
  counttotaldata=0
  constructor (private dctfWebService: DctfWeb) { }

  ngOnInit () : void {
    this.idsetor = 8
    this.dctfWebService.getAllDctfCompetencias().subscribe((data: any) => {
      this.competencias = data
      console.log(this.competencias)
    })
  }
}
