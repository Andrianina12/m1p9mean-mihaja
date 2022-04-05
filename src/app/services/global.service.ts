import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GlobalService {

  panier: Panier = new Panier();
  public url = "https://m1p9mean-mihaja-back.herokuapp.com/";
  constructor(private http: HttpClient) { }

  login(user): Observable<any> {
    return this.http.post(this.url + "login", user);
  }

  formOption (use_authorization = false, token = null) {
    const options = {
      headers: {
        'Content-Type' : 'application/json',
      }
    };

    if (use_authorization) {
      if(token == null) {
        token = '';
      }
      options['headers']['Authorization'] = token;
    }
    return options;
  }

}

export class Panier {
  plats: Panierplats[]
  total:number
  constructor() {
    this.plats = [];
    this.total = 0;
  }
}

export class Panierplats {
  nom: string;
  quantite: number;
  prix: number;
  montant: number;
}
