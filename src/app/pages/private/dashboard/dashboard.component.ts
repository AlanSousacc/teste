
import { Component, OnInit } from '@angular/core'
import { SessionService } from 'src/app/services/global/session.service'
import { NgxSpinnerService } from 'ngx-spinner'
import { HttpClient } from '@angular/common/http'
import { AppxService } from 'src/app/services/appservice/appx.service'
import { MessageService } from 'primeng/api'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [MessageService]
})
export class DashboardComponent implements OnInit {
  countries:any
  selectedCountry: any;
  name:any

  constructor (private AppService: AppxService, private http: HttpClient, private sessionService: SessionService, private spinner: NgxSpinnerService, private messageService: MessageService) {
    this.countries = [
      { name: 'Australia', code: 'AU' },
      { name: 'Brazil', code: 'BR' },
      { name: 'China', code: 'CN' },
      { name: 'Egypt', code: 'EG' },
      { name: 'France', code: 'FR' },
      { name: 'Germany', code: 'DE' },
      { name: 'India', code: 'IN' },
      { name: 'Japan', code: 'JP' },
      { name: 'Spain', code: 'ES' },
      { name: 'United States', code: 'US' }
    ]
  }

  ngOnInit (): void {

  }

  fileChange (event: any) {

  }

  sendHandler (evt: any) {
    const file: File = evt.files[0]
    console.log(file)
    const formData:FormData = new FormData()
    formData.append('uploadfile', file, file.name)
    formData.append('select', this.selectedCountry.name)
    formData.append('name', this.selectedCountry.name)

    this.AppService.saveForm(formData)
      .subscribe(
        (result: any) => {
          console.log(result)
        },
        (error: any) => {
          console.log(error)
        }
      )
  }
}
