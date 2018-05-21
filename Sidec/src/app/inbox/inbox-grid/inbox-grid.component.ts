import {
  Component, ViewEncapsulation, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { InboxServerResultsService } from '../../services/esri/inbox-server-results.service';
import { Page } from '../../services/model/page';
import { InboxData } from '../../services/model/inbox-data'
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { SidecDomains } from '../../services/esri/sidec-domains.service';

@Component({
  selector: 'app-inbox-grid',
  providers: [
    InboxServerResultsService
  ],
  templateUrl: './inbox-grid.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./inbox-grid.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})

export class InboxGridComponent implements OnInit {

  loadingIndicator: boolean = true;

  page = new Page();
  offset: number;
  pagesize: number;
  rows = new Array<InboxData>();
  paging = false;

  intervalCount: number;
  //Para ServerSide é usado um serviço no construtor
  constructor(private serverResultsService: InboxServerResultsService,
    private cd: ChangeDetectorRef) {
    this.pagesize = 10;
    this.page.pageNumber = 0;

    this.offset = 0;
    this.page.size = this.pagesize;
    this.paging = false;

    //Client Side
    // this.fetch((data) => {
    //   this.rows = data
    // });
  }


  @ViewChild('tableWrapper') tableWrapper;
  @ViewChild(DatatableComponent) table: DatatableComponent

  private currentComponentWidth;

  ngAfterViewChecked() {
    //Check if the table size has changed,
    if (this.table && this.table.recalculate) {
      if (this.tableWrapper.nativeElement.clientWidth !== this.currentComponentWidth) {
        this.currentComponentWidth = this.tableWrapper.nativeElement.clientWidth;
        //this.table.recalculate();
      }
      if (this.table.offset !== this.page.pageNumber) {
        this.table.offset = this.page.pageNumber;
        this.paging = false;
        this.table.recalculate();
      }
      //this.cd.detectChanges();
    }

  }


  ngOnInit() {
    clearInterval(SidecDomains.refreshIntervalId);
    //this.cd.detach();
    // SidecDomains.refreshIntervalId = setInterval(() => {
    //   try {
    //     //this.cd.detectChanges();
    //   }
    //   catch (err) { }
    // }, 5000);

    /*this.paging = true;
    this.loadingIndicator = true;
    this.page.pageNumber = 0;
    this.setPage({ offset: 0 });*/
  }

  /**
   * Populate the table with new data based on the page number
   * @param page The page to select
   */

  setFilter(whereTxt: string) {
    this.loadingIndicator = true;
    this.cd.detectChanges();
    this.serverResultsService.setWhere(whereTxt);
    this.cd.detectChanges();
    this.setPage({ offset: 0 });
  }

  setPage(pageInfo) {
    this.paging = true;
    this.loadingIndicator = true;
    this.page.pageNumber = pageInfo.offset;
    this.page.size = this.pagesize;
    this.rows = [];
    this.cd.detectChanges();
    this.serverResultsService.getResults(this.page).subscribe(
      pagedData => {
      this.page = pagedData.page;
      this.rows = pagedData.data;
      
      // reset page
      this.table.bodyComponent.updateOffsetY(pagedData.page.pageNumber);
      this.table.offset = pagedData.page.pageNumber;
      this.cd.detectChanges();
    },
    err => console.log(err),
    () => {
      this.rows = [...this.rows];
      this.loadingIndicator = false;
      //this.table.recalculate();
      
      //para garantir o bom dimensionamento do Grid o quanto antes após o carregamento
      this.intervalCount = 0;
      SidecDomains.refreshIntervalId = setInterval(() => {
        try {
          this.intervalCount += 1;
          if (this.intervalCount > 500) {
            clearInterval(SidecDomains.refreshIntervalId);
          }
          this.table.recalculate();
        }
        catch (err) {  }
      }, 100);

    });
  }

  intervalo()
  {
    
  }
  // @HostListener('document:click', ['$event'])
  // clickout(event) {
  //   if(this.eRef.nativeElement.contains(event.target)) {
  //     setTimeout(() => {
  //     this.cd.detectChanges();

  //     }, 1500);
  //   }

  // }
  //Necessário para corrigir um bug na exibição da página atual após o sort
  onSort(sorts) {
    if (this.table.offset !== this.page.pageNumber) {
      this.table.offset = this.page.pageNumber;
    }
  }

  onActivate(row) {
    alert('onSelect')
  }

  // Esta responsabilidade foi para o serviço
  // fetch(cb) {
  //   const req = new XMLHttpRequest();
  //   req.open('GET', `assets/data/company.json`);

  //   req.onload = () => {
  //     cb(JSON.parse(req.response));
  //   };

  //   req.send();
  // }



}
