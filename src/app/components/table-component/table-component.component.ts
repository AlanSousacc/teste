
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
@Component({
  selector: 'app-table-component',
  templateUrl: './table-component.component.html',
  styleUrls: ['./table-component.component.css']
})
export class TableComponentComponent implements OnInit {
  @Input() last: number;
  @Input() currentlast: number;
  @Input() totaldata: number; // -> usado para paginar, recebe o valor total de registros
  @Input() data = [];
  @Input() idsetor:any;

  @Output() loadnextpage = new EventEmitter<{last: any, table: any}>(); // -> usado emitir evento de next page, para trazer mais dados
  @Output() loadbackpage = new EventEmitter<{last: any, table: any}>(); // -> usado para emitir event de back page, para voltar algums registros

  constructor () {
    this.totaldata = 0
    this.currentlast = 0
    this.last = 0
    this.totaldata = 0
  }

  ngOnInit (): void {

  }

  loadPage (event:any, table:any) {
    if (event.first > this.currentlast) {
      this.loadnextpage.emit({ last: event.first, table: table })
    }
    if (event.first < this.currentlast) {
      this.loadbackpage.emit({ last: event.first, table: table })
    }
  }
}
