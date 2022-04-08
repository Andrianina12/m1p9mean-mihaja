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
  list = [];
  mot: string = '';
  routeState: any;
  panier: Panier;

  constructor(private router: Router, private globalService: GlobalService) {
    this.panier = this.globalService.panier;
    if (this.router.getCurrentNavigation().extras.state) {
      this.routeState = this.router.getCurrentNavigation().extras.state;
      if (this.routeState) {
        this.list = this.routeState.data;
        this.panier.restaurant = this.routeState.resto;
      }
    }
  }

  ngOnInit(): void {
    this.listeplats = this.list.filter(m => m.visible);
    this.list = this.listeplats;
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
    this.panier.benefice_resto += plats.benefice;
  }

  plus(plat: any) {
    plat.montant += plat.prix;
    this.panier.total += plat.prix;
    this.panier.benefice_resto += plat.benefice;
    plat.quantite++;
    console.log(plat);
  }

  minus(plat: any) {
    plat.montant -= plat.prix;
    this.panier.total -= plat.prix;
    this.panier.benefice_resto -= plat.benefice;
    plat.quantite--;
    if(plat.quantite == 0){
      this.panier.plats = this.panier.plats.filter(m => m.nom!= plat.nom);
    }
  }

  valider(){
    this.panier.benefice_ekaly = this.panier.benefice_resto * this.globalService.config.pourcentage;
    this.panier.benefice_resto -= this.panier.benefice_ekaly;
    this.router.navigate(['/panier'], {
      state: {
        data: this.panier
      }
    });
  }

  async search() {
    this.listeplats =await this.list.filter(m => m.nom.includes(this.mot));
  }

}
