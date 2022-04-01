import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService, Panier } from 'app/services/global.service';

@Component({
  selector: 'app-liste-plats',
  templateUrl: './liste-plats.component.html',
  styleUrls: ['./liste-plats.component.css'],
  providers: [GlobalService]
})
export class ListePlatsComponent implements OnInit {

  listeplats = [];
  routeState: any;
  panier: Panier;

  constructor(private router: Router, private globalService: GlobalService) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.routeState = this.router.getCurrentNavigation().extras.state;
      if (this.routeState) {
        this.listeplats = this.routeState.data
      }
    }
    this.panier = this.globalService.panier;
  }

  ngOnInit(): void {
  }

  ajouterPanier(plats: any) {
    let data = {
      nom: plats.nom,
      quantite:  1,
      prix: plats.prix,
      montant: plats.prix
    };
    this.panier.plats.push(data);
    this.panier.total += plats.prix;
  }

  plus(plat: any) {
    plat.montant += plat.prix;
    this.panier.total += plat.prix;
    plat.quantite++;
    console.log(plat);
  }

  minus(plat: any) {
    plat.montant -= plat.prix;
    this.panier.total -= plat.prix;
    plat.quantite--;
    if(plat.quantite == 0){
      this.panier.plats = this.panier.plats.filter(m => m.nom!= plat.nom);
    }
  }

  valider(){
    this.router.navigate(['/panier'], {
      state: {
        data: this.panier
      }
    });
  }

}
