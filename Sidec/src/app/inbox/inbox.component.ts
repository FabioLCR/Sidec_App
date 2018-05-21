import { Component, OnInit, ViewChild } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { SidecDomains } from '../services/esri/sidec-domains.service';
import { FilterInboxData } from '../services/model/filter-inbox-data';
import { InboxGridComponent } from './inbox-grid/inbox-grid.component';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
  frmAgente: any;
  frmEtapa: any;
  frmData: any;
  frmPesquisa: string;

  @ViewChild(InboxGridComponent) inboxGrid: InboxGridComponent;
  constructor(private router: Router) {  }

  etapas = [];
  agentes = [];
  fidata: FilterInboxData = new  FilterInboxData();
  

  ngOnInit() {
    this.frmPesquisa = ''
    this.frmAgente = 'erick';
    this.frmEtapa = '';
    this.etapas = SidecDomains.DC_ETAPA_CHAMADO.filter(x => x.code < 6);
    this.agentes = SidecDomains.DC_AGENTES;
    this.onBtnFilterClick();
  }

  onBtnFilterClick() {
    this.fidata.setAgente(this.frmAgente);
    this.fidata.setEtapa(this.frmEtapa);
    this.fidata.setData(this.frmData);
    this.fidata.setPesquisa(this.frmPesquisa.trim());
    this.inboxGrid.setFilter(this.fidata.getSQLStetment());
  }
}
