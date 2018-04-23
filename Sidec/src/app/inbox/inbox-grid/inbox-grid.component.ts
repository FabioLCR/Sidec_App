import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { InboxServerResultsService } from '../../services/esri/inbox-server-results.service';
import { Page } from '../../services/model/page';
import { InboxData } from '../../services/model/inbox-data'

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

  ngOnInit() {
    this.setPage({ offset: 0 });
  }

  /**
   * Populate the table with new data based on the page number
   * @param page The page to select
   */
  setPage(pageInfo){
    this.page.pageNumber = pageInfo.offset;
    this.serverResultsService.getResults(this.page).subscribe(pagedData => {
      this.page = pagedData.page;
      this.rows = pagedData.data;
    });
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
