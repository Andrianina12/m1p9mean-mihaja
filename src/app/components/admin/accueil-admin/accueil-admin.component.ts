import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'app/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-accueil-admin',
  templateUrl: './accueil-admin.component.html',
  styleUrls: ['./accueil-admin.component.css']
})
export class AccueilAdminComponent implements OnInit {

  list: [];
  livreurs: [];
  isLoading: Boolean;
  constructor(private service: AdminService, private router: Router) { }

  async ngOnInit() {
    this.isLoading = true;
    await this.getList();
    await this.getLivreur();
  }

  async getList() {
    const success = response => {
      if(response.code == 401) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          text: response.message,
          showConfirmButton: false,
          timer: 2500
        }).then(() => {
          this.router.navigateByUrl('');
        })
        
      } else if(response.code !=200) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          text: response.message,
          showConfirmButton: false,
          timer: 2500
        }).then(() => this.isLoading = false)
      } 
      else {
        this.list = response.data;
        this.isLoading = false
      } 
    }
    const error = response => { Swal.fire({
                position: 'center',
                icon: 'error',
                text: response.message,
                showConfirmButton: false,
                timer: 2500
              }).then(() => this.isLoading = false) }
    this.service.listCommandes().subscribe(success, error);
  }

  async getLivreur() {
    const success = response => {
      if(response.code == 401) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          text: response.message,
          showConfirmButton: true,
          timer: 2500
        }).then(() => {
          this.router.navigateByUrl('');
        })
        
      } else if(response.code !=200) Swal.fire({
                position: 'center',
                icon: 'error',
                text: response.message,
                showConfirmButton: false,
                timer: 2500
              })
      else {
        this.livreurs = response.data;
      } 
    }
    const error = response => { Swal.fire({
                position: 'center',
                icon: 'error',
                text: response.message,
                showConfirmButton: false,
                timer: 2500
              }) }
    this.service.listLivreurs().subscribe(success, error);
  }

  async update(commande) {
    console.log(commande);
    const success = response => {
      if(response.code == 401) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          text: response.message,
          showConfirmButton: false,
          timer: 2500
        }).then(() => {
          this.router.navigateByUrl('');
        })
        
      } else if(response.code !=200) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          text: response.message,
          showConfirmButton: false,
          timer: 12500
        }).then(() => this.isLoading = false)
      } 
      else {
        this.list = response.data;
        this.isLoading = false
      } 
    }
    const error = response => { Swal.fire({
                position: 'center',
                icon: 'error',
                text: response.message,
                showConfirmButton: false,
                timer: 2500
              })}
    this.service.updateCommande(commande).subscribe(success, error);
  }

}
