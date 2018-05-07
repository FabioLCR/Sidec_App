import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';
import { SidecDomains } from './services/esri/sidec-domains.service';

var _domains;


@Component({
  selector: 'app-root',
  providers: [SidecDomains],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})


export class AppComponent implements OnInit{
  title = 'SIDEC';
  
  domains = [];
  initialized = false;

  constructor(private kc: KeycloakService, 
    private sd: SidecDomains, 
    private cd: ChangeDetectorRef) {
    _domains = [];
   }

   
  ngOnInit() {
    this.initialized = SidecDomains.initialized;
    this.sd.initialize().subscribe(dName => {
      this.updateScreen(dName);
      this.domains = [...this.domains];
      this.cd.detectChanges();
    });
  }

  updateScreen(dName: string)
  {
    this.domains.push(dName);
    this.initialized = SidecDomains.initialized; 
    //this.cd.markForCheck();
  }

  logout() {
    this.kc.logout();
  }

  public getUserName() {
    return this.kc.getUsername();
  }
}
