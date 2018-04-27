import {Component, ViewEncapsulation, Input, OnInit} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { SidecDomains } from '../../services/esri/sidec-domains.service';

@Component({
  selector: 'app-inbox-descricao-solicitacao',
  templateUrl: './inbox-descricao-solicitacao.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./inbox-descricao-solicitacao.component.css']
})
export class InboxDescricaoSolicitacaoComponent implements OnInit {
  closeResult: string;
  @Input() value;
  @Input() useIcon?: boolean;

  data = "2018-04-27"
  cobrade = SidecDomains.DC_COBRADE.find(x => x.code === 11).name;
  motivo =  SidecDomains.DC_AA_MOTIVO.find(x => x.code === 56).name;
  constructor(private modalService: NgbModal) {}

  open(content){
    this.modalService.open(content, { windowClass: 'light-slate-gray', size: 'lg'});
  }

  ngOnInit() {
  }

}
