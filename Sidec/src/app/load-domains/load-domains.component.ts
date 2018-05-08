import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { SidecDomains } from '../services/esri/sidec-domains.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-load-domains',
  providers: [SidecDomains],
  templateUrl: './load-domains.component.html',
  styleUrls: ['./load-domains.component.css']
})
export class LoadDomainsComponent implements OnInit, OnDestroy {
  domains = [];
  initialized = SidecDomains.initialized;

  constructor(private sd: SidecDomains,
    private router: Router,
    private cd: ChangeDetectorRef) { }

  ngOnInit() {
    if (!SidecDomains.initialized) {
      this.sd.initialize()
        .subscribe(dName => {
          this.updateScreen(dName);
        });
    }
    else {
      this.sendMeHome();
    }
  }

  ngOnDestroy() {

  }

  updateScreen(dName: string) {
    this.domains.push(dName);
    this.initialized = SidecDomains.initialized;
    this.domains = [...this.domains];
    this.cd.detectChanges();
    if (SidecDomains.initialized) {
      this.sendMeHome();
    }
  }

  sendMeHome() {
    setTimeout(() => {
      this.router.navigate(['inbox']);
    }, 100);

  }
}
