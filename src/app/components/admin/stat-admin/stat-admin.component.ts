import { Component, OnInit } from '@angular/core';
import { AdminService } from 'app/services/admin.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stat-admin',
  templateUrl: './stat-admin.component.html',
  styleUrls: ['./stat-admin.component.css']
})
export class StatAdminComponent implements OnInit {

  isLoading: boolean;
  list = [];
  constructor(private service: AdminService, private router: Router) { }

  async ngOnInit() {
    this.isLoading = true;
    await this.getList();
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
    this.service.stat({}).subscribe(success, error);
  }
}