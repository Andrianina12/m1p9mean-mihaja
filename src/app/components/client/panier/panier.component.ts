import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'app/services/client.service';
import { GlobalService, Panier } from 'app/services/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css'],
  providers: [ClientService, GlobalService]
})
export class PanierComponent implements OnInit {
  panier: Panier;
  routeState: any;
  adresse: string = '';
  numero: string;
  date: Date = new Date();
  frais: number;

  constructor(private router: Router, public datePipe: DatePipe, private service: ClientService, private globalService: GlobalService) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.routeState = this.router.getCurrentNavigation().extras.state;
      if (this.routeState) {
        this.panier = this.routeState.data
      }
    }
    this.frais = this.globalService.config.frais;
  }

  ngOnInit(): void {
  }

  valider() {
    this.panier.date = this.datePipe.transform(this.date, 'yyyy-MM-dd,  h:mm a');
    this.panier.nom = localStorage.getItem('user');
    this.panier.adresse = this.adresse;
    this.panier.numero = this.numero;
    this.panier.etat = 'commandée';

    const success = response => {
      if(response.code == 401) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          text: response.message,
          showConfirmButton: false,
          timer: 2500
        })
        this.router.navigate['/'];
      } else if(response.code !=200) Swal.fire({
                position: 'center',
                icon: 'error',
                text: response.message,
                showConfirmButton: false,
                timer: 2500
              })
      else {
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: "Votre commande est bien reçue",
          showConfirmButton: true,
          timer: 2500
        }).then(() => {
          this.router.navigate(['/home']);
        })
        
      } 
    }
    const error = response => { Swal.fire({
                position: 'center',
                icon: 'error',
                text: response.message,
                showConfirmButton: false,
                timer: 2500
              }) }
    this.service.commander(this.panier).subscribe(success, error);
  }

}
