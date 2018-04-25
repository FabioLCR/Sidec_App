import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { InboxServerResultsService } from '../../services/esri/inbox-server-results.service';
import { Page } from '../../services/model/page';
import { InboxData } from '../../services/model/inbox-data'
import { DatatableComponent } from '@swimlane/ngx-datatable';


declare var $: any;

@Component({
  selector: 'app-inbox-grid',
  providers: [
    InboxServerResultsService
  ],
  templateUrl: './inbox-grid.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./inbox-grid.component.css']
})

export class InboxGridComponent implements OnInit {
  loadingIndicator: boolean = true;

  page = new Page();
  rows = new Array<InboxData>();


  //Para ServerSide é usado um serviço no construtor
  constructor(private serverResultsService: InboxServerResultsService) {
    this.page.pageNumber = 0;
    this.page.size = 10;

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
        this.table.recalculate();
      }
      if (this.table.offset !== this.page.pageNumber) {
        this.table.offset = this.page.pageNumber;
      }
    }

  }

  ngOnInit() {
    this.setPage({ offset: 0 });
  }

  /**
   * Populate the table with new data based on the page number
   * @param page The page to select
   */
  setPage(pageInfo) {
    this.loadingIndicator = true;
    this.page.pageNumber = pageInfo.offset;
    this.serverResultsService.getResults(this.page).subscribe(pagedData => {
      this.page = pagedData.page;
      this.rows = pagedData.data;
      this.rows = [...this.rows];

      for (let tout = 0; tout < 500; tout+=10) {
        this.loadingIndicator = false;
        setTimeout(() => {
          this.rows = [...this.rows];
        }, tout);
      }
    });


  }

  onSort(sorts) {
    if (this.table.offset !== this.page.pageNumber) {
      this.table.offset = this.page.pageNumber;
    }
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
