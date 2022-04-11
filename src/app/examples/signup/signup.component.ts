import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'app/services/global.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    providers: [GlobalService]
})
export class SignupComponent implements OnInit {
    test : Date = new Date();
    focus;
    focus1;
    email: string = '';
    motdepasse: string = '';
    constructor(private router: Router, private globalservice: GlobalService) { }

    ngOnInit() {}

    login(): void {
        if(this.email =='' || this.motdepasse == '') {
            Swal.fire({
                position: 'center',
                icon: 'error',
                text: 'Veuillez completer tous les champs',
                showConfirmButton: false,
                timer: 2500
              })
        }
        let login = {
            email: this.email,
            motdepasse: this.motdepasse
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
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', response.data.email);
                if(response.data.role == 'client') this.router.navigateByUrl("/home");
                else if(response.data.role == 'admin') this.router.navigateByUrl("/commandes");
                else this.router.navigateByUrl("/accueil");
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
        this.globalservice.login(login).subscribe(success, error);
    }
}
