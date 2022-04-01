import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil-client',
  templateUrl: './accueil-client.component.html',
  styleUrls: ['./accueil-client.component.css']
})
export class AccueilClientComponent implements OnInit {

  listeResto = [];
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getListeResto();
  }

  getListeResto() {
    this.listeResto = [
      {
        image: "assets/img/resto/resto1.jpg",
        nom: "Dragon Royal",
        adresse: "Ambodivona",
        numero: "+261 34 59 785 62",
        plats: [
          {
            nom: "Calamars au curry",
            prix: 22000,
            image: "assets/img/plats/plat1.jpg"
          }, {
            nom: "Pancakes",
            prix: 12000,
            image: "assets/img/plats/plat2.png"
          }
        ]
      }, {
        image: "assets/img/resto/resto2.jpg",
        nom: "Dragon Royal",
        adresse: "Ambodivona",
        numero: "+261 34 59 785 62",
        plats: [
          {
            nom: "Calamars au curry",
            prix: 22000,
            image: "assets/img/plats/plat1.jpg"
          }, {
            nom: "Pancakes",
            prix: 12000,
            image: "assets/img/plats/plat2.png"
          }, {
            nom: "Calamars au curry2",
            prix: 22000,
            image: "assets/img/plats/plat1.jpg"
          }, {
            nom: "Pancakes2",
            prix: 12000,
            image: "assets/img/plats/plat2.png"
          }
        ]
      }, {
        image: "assets/img/resto/resto3.jpg",
        nom: "Dragon Royal",
        adresse: "Ambodivona",
        numero: "+261 34 59 785 62",
        plats: [
          {
            nom: "Calamars au curry",
            prix: 22000,
            image: "assets/img/plats/plat1.jpg"
          }, {
            nom: "Pancakes",
            prix: 12000,
            image: "assets/img/plats/plat2.png"
          }
        ]
      }
    ]
  }

  listePlats(resto: any) {
    this.router.navigate(['/plats'], {
      state: {
        data: resto.plats
      }
    });
  }

}
