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
  constructor(private service: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.getList();
  }

  async getList() {
    const success = response => {
      if(response.code == 401) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          text: response.message,
          showConfirmButton: true,
          timer: 2500
        }).then(() => {
          this.router.navigate['/'];
        })
        
      } else if(response.code !=200) Swal.fire({
                position: 'center',
                icon: 'error',
                text: response.message,
                showConfirmButton: false,
                timer: 2500
              })
      else {
        this.list = response.data;
      } 
    }
    const error = response => { Swal.fire({
                position: 'center',
                icon: 'error',
                text: response.message,
                showConfirmButton: false,
                timer: 2500
              }) }
    this.service.listCommandes().subscribe(success, error);
  }

}
