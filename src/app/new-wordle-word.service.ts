import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NewWordleWordService {

  constructor(
    private http:HttpClient
  ) { }

  getRequest():Observable<any> {
    return this.http.get("http://localhost:8080/awfulWordleV2/wordle_api.php")
  }
}
