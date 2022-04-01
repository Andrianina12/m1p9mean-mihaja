import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService, Panier } from 'app/services/global.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css'],
  providers: [GlobalService]
})
export class PanierComponent implements OnInit {
  panier: Panier;
  routeState: any;

  constructor(private router: Router) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.routeState = this.router.getCurrentNavigation().extras.state;
      if (this.routeState) {
        this.panier = this.routeState.data
      }
    }
  }

  ngOnInit(): void {
  }

  valider() {
    alert("Votre commande est bien reçue");
    this.router.navigate(['/home']);
  }

}
