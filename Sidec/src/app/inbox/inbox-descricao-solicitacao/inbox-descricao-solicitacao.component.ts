import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-inbox-descricao-solicitacao',
  templateUrl: './inbox-descricao-solicitacao.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./inbox-descricao-solicitacao.component.css']
})
export class InboxDescricaoSolicitacaoComponent implements OnInit {

  constructor(private modalService: NgbModal) { }
  closeResult: string;
  @Input() Solicitacao;

  open(content){
    this.modalService.open(content, { windowClass: 'light-slate-gray', size: 'lg'});
  }

  ngOnInit() {
  
  }

}
