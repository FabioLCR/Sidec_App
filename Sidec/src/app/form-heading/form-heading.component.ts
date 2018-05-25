import { Component, OnInit, Input } from '@angular/core';
import { SidecDomains } from '../services/esri/sidec-domains.service';

@Component({
  selector: 'app-form-heading',
  templateUrl: './form-heading.component.html',
  styleUrls: ['./form-heading.component.css']
})
export class FormHeadingComponent implements OnInit {

  @Input() isNovaSol?: boolean;
  @Input() solicitacao?: number;
  @Input() data: Date;
  @Input() agente: String;

  constructor() { }

  solicitacaoFrm = "0000000";
  dataFrm = ""
  agenteFrm = ""
  
  ngOnInit() {
    this.solicitacaoFrm = this.solicitacao.toLocaleString()
    this.agenteFrm = (this.agente !== null) ? SidecDomains.DC_AGENTES.find(x => x.code === this.agente).name : "";
    this.dataFrm = new Date( this.data ).toLocaleString()
  }

}
