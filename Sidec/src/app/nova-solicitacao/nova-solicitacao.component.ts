import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { SidecDomains } from '../services/esri/sidec-domains.service';
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nova-solicitacao',
  templateUrl: './nova-solicitacao.component.html',
  styleUrls: ['./nova-solicitacao.component.css']
})


export class NovaSolicitacaoComponent implements OnInit {
  @Input() edit?: boolean;

  constructor(private kc: KeycloakService/*, public activeModal:NgbActiveModal*/) { }

  solicitacao: number;
  data: Date;
  agente: String;

  motivo_alegados = []
  situacoes = []
  tdocumentos = []

  frmMotivoAlegado = ''
  frmSituacao = ''
  frmTipoDocumento = 1  // Carteira de Identidade
  frmEsclarecimento = ''
  frmCobrade = ''
  frmPontoEndereco = null;//{"ponto": null, "latitude": null, "longitude": null}
  frmTelefone1 = ''
  ngOnInit() {
    if (!this.edit) {
      this.solicitacao = 0
      this.data = new Date(Date.now())
      //this.agente = this.kc.getUsername()
      this.agente = 'erick'
    }

    this.motivo_alegados = SidecDomains.DC_AA_MOTIVO;
    this.situacoes = SidecDomains.DC_SITUACAO;
    this.tdocumentos = SidecDomains.DC_DOCUMENTO;
  }

  onCobradeReturn(event){
    
    this.frmCobrade =  event;
    //this.activeModal.close();
  }

  onMapEventClick(event){
    this.frmPontoEndereco = event;
  }

  mascara(mask, vlr){
    var regx = new RegExp(mask);
    if (regx.test(vlr.target.value + vlr.key)){
      if (vlr.target.value.length === 1){
        vlr.target.value += vlr.key + ' ';
        vlr.preventDefault();
      }
    }else{
      vlr.preventDefault();
    }
  }
}
