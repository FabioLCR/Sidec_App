import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { SidecDomains } from '../services/esri/sidec-domains.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-load-domains',
  providers: [SidecDomains],
  templateUrl: './load-domains.component.html',
  styleUrls: ['./load-domains.component.css']
})
export class LoadDomainsComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<any> = new Subject();
  domains = [];
  initialized = SidecDomains.initialized;

  constructor(private sd: SidecDomains,
    private router: Router,
    private cd: ChangeDetectorRef) { }

  ngOnInit() {
    if (!SidecDomains.initialized) {
      this.sd.initialize()
        .takeUntil(this.ngUnsubscribe)
        .subscribe(dName => {
          this.updateScreen(dName);
        });
    }
    else {
      this.sendMeHome();
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
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
