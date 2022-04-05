import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'app/services/client.service';

@Component({
  selector: 'app-accueil-client',
  templateUrl: './accueil-client.component.html',
  styleUrls: ['./accueil-client.component.css']
})
export class AccueilClientComponent implements OnInit {

  listeResto = [];
  constructor(private router: Router, private service: ClientService) { }

  ngOnInit(): void {
    this.getListeResto();
  }

  getListeResto() {
    const success = response => {
      if(response.code == 401) {
        alert(response.message);
        this.router.navigate['/'];
      } else if(response.code !=200) alert(response.message);
      else this.listeResto = response.data;
    }
    const error = response => { alert(response.message); }
    this.service.getList().subscribe(success, error);
  }

  listePlats(resto: any) {
    this.router.navigate(['/plats'], {
      state: {
        data: resto.plats
      }
    });
  }

}
