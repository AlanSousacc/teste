
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
  name:any;
  tempNameArquivo: string;

  constructor (
    private AppService: AppxService,
    private http: HttpClient,
    private sessionService: SessionService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService
  ) {
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
    this.tempNameArquivo = '';
  }

  ngOnInit (): void {

  }

  fileChange (event: any) {

  }

  sendHandler (evt: any) {
    const file: File = evt.files[0]
    const formData:FormData = new FormData()
    formData.append('uploadfile', file, file.name)
    formData.append('select', this.selectedCountry.name)
    formData.append('name', this.name)

    this.AppService.saveForm(formData)
    .subscribe(
      (result: any) => {
        this.tempNameArquivo = result.path;
        this.AppService.download(result.path)
        .subscribe(blob => {

          const a = document.createElement('a')
          const objectUrl = URL.createObjectURL(blob)


          a.href = objectUrl
          a.download = this.tempNameArquivo;
          a.click();
          URL.revokeObjectURL(objectUrl);
        })
        //  teste
      },
      (error: any) => {
        console.log(error)
      }
    )
  }

  downLoadFile(data: any, type: string) {
    let blob = new Blob([data], { type: type});
    let url = window.URL.createObjectURL(blob);
    let pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
        alert( 'Please disable your Pop-up blocker and try again.');
    }
  }
}
