import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'app/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  list = [];
  email: string = '';
  motdepasse: string = '';
  role: string = '';
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
    this.service.listUtilisateurs().subscribe(success, error);
  }

  async insert() {
    if(this.email == '' || this.motdepasse == '' || this.role == ''){
      Swal.fire({
        position: 'center',
        icon: 'error',
        text: "Completez le formulaire",
        showConfirmButton: false,
        timer: 2500
      })
    } else {
      var user = {
        email: this.email,
        motdepasse: this.motdepasse,
        role: this.role
      }
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
      this.service.insertUser(user).subscribe(success, error);
    }
  }
}
