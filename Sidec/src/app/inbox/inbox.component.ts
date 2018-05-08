import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { SidecDomains } from '../services/esri/sidec-domains.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  constructor(private router: Router) {  }

  etapas = [];

  ngOnInit() {
    this.etapas = SidecDomains.DC_ETAPA_CHAMADO.filter(x => x.code < 6);
  }

  onBtnFilterClick() {
    alert('teste');
  }
}
