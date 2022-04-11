import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil-livreur',
  templateUrl: './accueil-livreur.component.html',
  styleUrls: ['./accueil-livreur.component.css']
})
export class AccueilLivreurComponent implements OnInit {

  isLoading: boolean;
  constructor() { }

  async ngOnInit() {
    this.isLoading = true;
    await new Promise(resolve => setTimeout(resolve, 5000));
    this.isLoading = false;
  }

}
