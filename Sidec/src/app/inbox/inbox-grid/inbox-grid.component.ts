import {
  Component, ViewEncapsulation, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { InboxServerResultsService } from '../../services/esri/inbox-server-results.service';
import { Page } from '../../services/model/page';
import { InboxData } from '../../services/model/inbox-data'
import { DatatableComponent } from '@swimlane/ngx-datatable';

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
  rows = new Array<InboxData>();
  paging = false;

  //Para ServerSide é usado um serviço no construtor
  constructor(private serverResultsService: InboxServerResultsService,
    private cd: ChangeDetectorRef) {
    this.page.pageNumber = 0;
    this.offset = 0;
    this.page.size = 10;
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

      }
      if (this.table.offset !== this.page.pageNumber) {
        this.table.offset = this.page.pageNumber;
        this.paging = false;
      }
      this.table.recalculate();
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
    this.paging = true;
    this.loadingIndicator = true;
    this.page.pageNumber = pageInfo.offset;
    this.serverResultsService.getResults(this.page).subscribe(pagedData => {
      this.page = pagedData.page;
      this.rows = pagedData.data;
      this.rows = [...this.rows];
      // reset page
      this.table.bodyComponent.updateOffsetY(this.page.pageNumber);
      this.table.offset = this.page.pageNumber;
      this.loadingIndicator = false;
      this.table.recalculate();
      //this.cd.markForCheck();

      //para garantir o bom dimensionamento do Grid o quanto antes após o carregamento
      for (let tout = 0; tout < 1500; tout += 10) {
        this.loadingIndicator = false;
        setTimeout(() => {
          this.paging = false;

          //Dispara o evento que organiza o grid
          this.rows = [...this.rows];
          this.table.recalculate();

        }, tout);
        
      }
    });
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
