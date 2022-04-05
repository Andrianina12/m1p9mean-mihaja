import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient, private globalService: GlobalService) { }

  getList(): Observable<any> {
    const options = this.globalService.formOption(true, localStorage.getItem('token'));
    return this.http.get(this.globalService.url + "restaurants", options);
  }

}
