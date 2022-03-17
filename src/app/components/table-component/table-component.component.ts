import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-table-component',
  templateUrl: './table-component.component.html',
  styleUrls: ['./table-component.component.css']
})
export class TableComponentComponent implements OnInit {
  @Input() data = [];
  @Input() idsetor:any;

  constructor () { }

  ngOnInit (): void {

  }

  loadPage (dw: any, dwa: any): void {
    console.log(dw)
    console.log(dwa)
  }
}
