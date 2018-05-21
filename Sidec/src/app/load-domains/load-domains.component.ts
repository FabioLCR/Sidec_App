import { Component, OnInit, ChangeDetectorRef, OnDestroy, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';
import { SidecDomains } from '../services/esri/sidec-domains.service';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-load-domains',
  providers: [SidecDomains],
  templateUrl: './load-domains.component.html',
  styleUrls: ['./load-domains.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadDomainsComponent implements OnInit, OnDestroy {
  domains = [];
  initialized = SidecDomains.initialized;
  refreshIntervalId: any;
  private subject: Subject<boolean>;

  @Output() loaded = new EventEmitter();

  constructor(private sd: SidecDomains,
    private router: Router,
    private ref: ChangeDetectorRef) {
      
    ref.detach();
    SidecDomains.refreshIntervalId = setInterval(() => {
      try {
        this.ref.detectChanges();
      }
      catch (err) { }
    }, 100);
  }

  ngOnInit() {
    if (!SidecDomains.initialized) {
      this.sd.initialize()
        .subscribe(dName => { this.updateScreen(dName); },
          err => console.error('Observer got an error: ' + err),
          () => {
            this.ref.reattach();
            //setTimeout(() => { 
              this.loaded.emit(SidecDomains.initialized);
              this.sendMeHome();// }, 100)
          });
    }
    else {
      this.loaded.emit(SidecDomains.initialized);
      this.sendMeHome();
    }
  }


  ngOnDestroy() {
    //Levei para o OnNgInit do inbox-grid para corrigir um Bug:
    //.Quando inbox chamado após o Load não carrega o Grid. 
    //.Desta forma ele gera um evento "inesperado" que carrega o Grid.
    //clearInterval(SidecDomains.refreshIntervalId);
  }

  updateScreen(dName: string) {
    this.domains.push(dName);
    this.initialized = SidecDomains.initialized;
    this.domains = [...this.domains];
    this.ref.detectChanges();
    if (SidecDomains.initialized) {
      this.sendMeHome();
    }
  }

  sendMeHome() {
    this.router.navigate(['inbox']);
  }
}
