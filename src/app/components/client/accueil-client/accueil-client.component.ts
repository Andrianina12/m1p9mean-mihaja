import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'app/services/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-accueil-client',
  templateUrl: './accueil-client.component.html',
  styleUrls: ['./accueil-client.component.css']
})
export class AccueilClientComponent implements OnInit {

  listeResto = [];
  list = [];
  mot: string = '';
  isLoading: boolean;
  constructor(private router: Router, private service: ClientService) { }

  async ngOnInit() {
    this.isLoading = true;
    await this.getListeResto();
  }

  getListeResto() {
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
        
      } else if(response.code !=200){
        Swal.fire({
          position: 'center',
          icon: 'error',
          text: response.message,
          showConfirmButton: false,
          timer: 2500
        }).then(() => this.isLoading = false)
      } 
      else {
        this.listeResto = response.data;
        this.list = response.data;
        this.isLoading = false;
      } 
    }
    const error = response => { Swal.fire({
                position: 'center',
                icon: 'error',
                text: response.message,
                showConfirmButton: false,
                timer: 2500
              }).then(() => this.isLoading = false) }
    this.service.getList().subscribe(success, error);
  }

  listePlats(resto: any) {
    this.router.navigate(['/plats'], {
      state: {
        data: resto.plats,
        resto: resto.nom
      }
    });
  }

  search() {
    this.listeResto = this.list.filter(m => m.nom.includes(this.mot));
  }

}
