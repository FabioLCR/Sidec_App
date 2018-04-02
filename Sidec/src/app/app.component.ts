import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SIDEC';
  constructor(private kc: KeycloakService) { }

  logout() {
    this.kc.logout();
  }

  public getUserName() {
    return this.kc.getUsername();
  }
}
