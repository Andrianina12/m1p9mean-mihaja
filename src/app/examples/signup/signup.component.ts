import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    test : Date = new Date();
    focus;
    focus1;
    email: string;
    motdepasse: string;
    constructor(private router: Router) { }

    ngOnInit() {}

    login(): void {
        let login = {
            email: this.email,
            motdepasse: this.motdepasse
        };
        console.log("login", login);
        this.router.navigateByUrl("/home");
    }
}
