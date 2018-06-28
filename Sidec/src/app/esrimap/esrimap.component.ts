import { Component, OnInit, Input, AfterViewInit  } from '@angular/core';
import { EsrimapService } from './esrimap.service';

@Component({
  selector: 'img-esrimap',
  templateUrl: './esrimap.component.html',
  styleUrls: ['./esrimap.component.css']
})
export class EsrimapComponent implements OnInit {

  @Input() id:string;

  constructor(private esrimapService:EsrimapService) { }

  ngOnInit() {
    this.esrimapService.loadMap(this.id);
  }
}
