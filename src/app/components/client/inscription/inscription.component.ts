import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'app/services/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  test : Date = new Date();
  focus;
  focus1;
  email: string = '';
  motdepasse: string = '';
  nouveau: string = '';
  constructor(private router: Router, private service: ClientService) { }

  ngOnInit() {}

  signin(): void {
    if(this.email =='' || this.motdepasse == '') {
      Swal.fire({
          position: 'center',
          icon: 'error',
          text: 'Veuillez completer tous les champs',
          showConfirmButton: false,
          timer: 2500
        })
    } else if(this.nouveau != this.motdepasse) {
        Swal.fire({
                  position: 'center',
                  icon: 'error',
                  text: 'Les deux mots de passe ne sont pas identiques',
                  showConfirmButton: false,
                  timer: 2500
                })
    } else {
      let login = {
          email: this.email,
          motdepasse: this.motdepasse,
      };
      console.log("login", login);
      const success = async response => {
        if(response.code != 200) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                text: response.message,
                showConfirmButton: false,
                timer: 2500
              })
        }
        else {
          Swal.fire({
            position: 'center',
            icon: 'success',
            text: response.message + '!! Veuillez vous connecter maintenant',
            showConfirmButton: false,
            timer: 2500
          });
          this.router.navigateByUrl("");
        } 
    }
    const error = response => { 
        Swal.fire({
            position: 'center',
            icon: 'error',
            text: response.message,
            showConfirmButton: false,
            timer: 2500
        })
    };
    this.service.inscripiton(login).subscribe(success, error);
    }
      
  }

}
