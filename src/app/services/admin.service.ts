import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private globalService: GlobalService) { }

  listCommandes(): Observable<any> {
    const options = this.globalService.formOption(true, localStorage.getItem('token'));
    return this.http.get(this.globalService.url + "commandesAdmin", options);
  }
}
