import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'app/services/global.service';

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
    email: string;
    motdepasse: string;
    constructor(private router: Router, private globalservice: GlobalService) { }

    ngOnInit() {}

    login(): void {
        let login = {
            email: this.email,
            motdepasse: this.motdepasse
        };
        console.log("login", login);
        const success = async response => {
            if(response.code != 200) alert(response.message);
            else localStorage.setItem('token', response.data.token);
            if(response.data.role == 'client') this.router.navigateByUrl("/home");
        }
        const error = response => { alert(response.message)};
        this.globalservice.login(login).subscribe(success, error);
    }
}
