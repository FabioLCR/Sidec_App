import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';
import { SidecDomains } from '../services/esri/sidec-domains.service';
import { LoadDomainsComponent } from '../load-domains/load-domains.component';

@Component({
  selector: 'sidec-main-app',
  templateUrl: './sidec-main-app.component.html',
  styleUrls: ['./sidec-main-app.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})


export class SidecMainAppComponent implements OnInit {
  title = 'SIDEC';

  constructor(private kc: KeycloakService, private ref: ChangeDetectorRef) {
  }

  initialized = false;

  ngOnInit() {
    // this.ldomain.loaded().subscribe(initialized => { this.initialized = initialized; },
    //   err => console.error('Observer got an error: ' + err),
    //   () => { });
  }

  logout() {
    this.kc.logout();
  }

  public getUserName() {
    return this.kc.getUsername();
  }

  reciverFeedback(initialized) {
    this.initialized = initialized;
    this.ref.detectChanges();
  }
}
