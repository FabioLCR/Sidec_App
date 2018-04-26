import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { SidecDomains } from '../services/esri/sidec-domains.service';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.css']
})
export class HeadingComponent implements OnInit {

  constructor(private kc: KeycloakService) { }
  ngOnInit() {
    
    
  }

  logout() {
    this.kc.logout();
  }

  public getUserName() {
    return this.kc.getUsername();
  }
}
