
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import * as XLSX from 'xlsx'
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
  cities: any
  selectedCityCode: string
  searchValue: string
  @Output() loadnextpage = new EventEmitter<{last: any, table: any}>(); // -> usado emitir evento de next page, para trazer mais dados
  @Output() loadbackpage = new EventEmitter<{last: any, table: any}>(); // -> usado para emitir event de back page, para voltar algums registros
  @Output() searchdata = new EventEmitter<{value: any}>(); // -> usado para emitir event de pesquisa de dados

  constructor () {
    this.totaldata = 0
    this.currentlast = 0
    this.last = 0
    this.totaldata = 0
    this.selectedCityCode = ''
    this.searchValue = ''
  }

  ngOnInit (): void {
    this.cities = [
      { name: '11/2021', value: '59' },
      { name: '10/2021', value: '56' },
      { name: '7/2021', value: '53' },
      { name: '7/2021', value: '52' },
      { name: '7/2021', value: '52' },
      { name: '7/2021', value: '51' },
      { name: '7/2021', value: '50' }
    ]
  }

  searchData () {
    this.searchdata.emit({ value: this.searchValue })
  }

  exportDataToXlsx () {
    /* pass here the table id */
    const element = document.getElementById('excel-table')
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element)

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

    /* save to file */
    XLSX.writeFile(wb, 'dwwd')
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
