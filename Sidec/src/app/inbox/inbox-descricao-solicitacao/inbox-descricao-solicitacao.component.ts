import { Component, ViewEncapsulation, Input, OnInit, OnDestroy } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SidecDomains } from '../../services/esri/sidec-domains.service';
import { SolicitacaoService } from '../../services/esri/solicitacao.service';
import { SolicitacaoData } from '../../services/model/solicitacao-data';

@Component({
  selector: 'app-inbox-descricao-solicitacao',
  providers: [
    SolicitacaoService
  ],
  templateUrl: './inbox-descricao-solicitacao.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./inbox-descricao-solicitacao.component.css'],
})
export class InboxDescricaoSolicitacaoComponent implements OnInit, OnDestroy {
  closeResult: string;

  @Input() nsol: number;
  @Input() dataInbox: string;
  @Input() etapa: string;
  @Input() responsavel: string;
  @Input() useIcon?: boolean;

  
  data = "";
  cobrade = "";
  motivo_alegado = "";
  agente = "";
  situacao = "";
  esclarecimento = "";
  solicitante = "";
  nome_responsavel = "";
  constructor(private modalService: NgbModal,
    private solicitacao: SolicitacaoService) {
      
  }



  open(content) {
    try {
      this.nome_responsavel = SidecDomains.DC_AGENTES.find(x => x.code === this.responsavel).name;
    } catch (err) {
      this.nome_responsavel = this.responsavel;
    }
    this.modalService.open(content, { windowClass: 'light-slate-gray', size: 'lg' });

    this.solicitacao.getByNSol(this.nsol)
      .subscribe(
        sol => {
          try {
            this.data = sol.data.toLocaleDateString();
            this.cobrade = (sol.cobrade !== null) ? SidecDomains.DC_COBRADE.find(x => x.code === sol.cobrade).name : "";
            this.motivo_alegado = (sol.motivo_alegado !== null) ? sol.motivo_alegado : "";// (sol.motivo_alegado !== null) ? SidecDomains.DC_AA_MOTIVO.find(x => x.code === sol.motivo_alegado).name : "";
            this.agente = (sol.agente !== null) ? sol.agente : "";
            this.situacao = (sol.situacao !== null) ? SidecDomains.DC_SITUACAO.find(x => x.code === sol.situacao).name : "";
            this.esclarecimento = (sol.esclarecimento !== null) ? sol.esclarecimento : "";
            this.solicitante = (sol.solicitante !== null) ? sol.solicitante : "";
          } catch (err) {
            console.log(err);
          }
        },
        err => console.log(err),
        () => { /*Pode ser implementado Load depois*/});



    //SolicitacaoData = this.solicitacao.getByNSol(this.nsol);
  }

  ngOnInit() {
    //this.cd.reattach();
  }

  ngOnDestroy() {

  }

  refresh() {
    //this.cd.detach();
  }
}
