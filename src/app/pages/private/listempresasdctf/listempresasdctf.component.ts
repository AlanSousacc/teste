
import { DctfWeb } from '../../../services/dctfweb/dctfweb.service'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-dashboard',
  templateUrl: './listempresasdctf.component.html',
  styleUrls: ['./listempresasdctf.component.css']
})
export class ListempresasdctfComponent implements OnInit {
  currenpage:any
  data:any
  constructor (private dctfWebService: DctfWeb, private route: ActivatedRoute) { }

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
  }

  async getList () {
    const objSend = {
      id_empresa_competencia: this.route.snapshot.paramMap.get('id')
    }
    this.dctfWebService.getListaEmpresasDctf(objSend).subscribe(
      (competencias: any) => {
        this.data = competencias.data
      })
  }
}
