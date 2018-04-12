import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})

export class InboxComponent implements OnInit {

  
  gridCollapsed: boolean;
  constructor() { }

  ngOnInit() {
  }

  painelChange($event: NgbPanelChangeEvent)
  {

    this.gridCollapsed = !$event.nextState;
 
  }
}
