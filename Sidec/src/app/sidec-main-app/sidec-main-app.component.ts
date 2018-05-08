import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'sidec-main-app',
  templateUrl: './sidec-main-app.component.html',
  styleUrls: ['./sidec-main-app.component.css'],
})


export class SidecMainAppComponent implements OnInit{
  title = 'SIDEC';
  
  constructor(private kc: KeycloakService) {
   }

   
  ngOnInit() {
  
  }

  logout() {
    this.kc.logout();
  }

  public getUserName() {
    return this.kc.getUsername();
  }
}
