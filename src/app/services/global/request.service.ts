import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  constructor (
  private http: HttpClient
  ) { }

  get<T> (data: object, endpointUrl: string = '', apiUrl: string = environment.apiUrl): Observable<T | Object> {
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
    const params = new HttpParams().append('data', JSON.stringify(data))
    return this.http.get(`${apiUrl}${endpointUrl}`, { headers, params })
      .pipe(
        catchError(this.handleError)
      )
  }

  post<T> (data: object, endpointUrl: string = '', apiUrl: string = environment.apiUrl): Observable<T | Object> {
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
    const params = new HttpParams().append('data', JSON.stringify(data))
    return this.http.post(`${apiUrl}${endpointUrl}`, params, { headers })
      .pipe(
        catchError(this.handleError)
      )
  }

  put<T> (data: object, endpointUrl: string = '', apiUrl: string = environment.apiUrl): Observable<T | Object> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    const params = new HttpParams().append('data', JSON.stringify(data))
    return this.http.put(`${apiUrl}${endpointUrl}`, params, { headers })
      .pipe(
        catchError(this.handleError)
      )
  }

  delete<T> (id: number, endpointUrl: string = '', apiUrl: string = environment.apiUrl): Observable<T | Object> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    return this.http.delete(`${apiUrl}${endpointUrl}/${id}`, { headers }).pipe(
      catchError(this.handleError))
  }

  private handleError<HttpErrorResponse> (error: HttpErrorResponse): Observable<any> {
    return throwError(error)
  }
}
