import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { EsrimapService } from './esrimap.service';

@Component({
  selector: 'img-esrimap',
  providers: [
    EsrimapService,
  ],
  templateUrl: './esrimap.component.html',
  styleUrls: ['./esrimap.component.css']
})
export class EsrimapComponent implements OnInit {

  @Input() nome: String;
  @Input() lat?: number;
  @Input() long?: number;

  @Output("eventClick") resp = new EventEmitter();
  constructor(private esrimapService:EsrimapService) { }

  ngOnInit() {
    this.esrimapService.loadMap(this.nome, this.lat, this.long/*, -22.913134, -43.088225*/).subscribe(
      eventClick => {
        this.resp.emit(eventClick);
      }
    );
  }
}
