import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
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
