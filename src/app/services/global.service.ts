import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

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
export class GlobalService {

  panier: Panier = new Panier();
  constructor() { }
}
