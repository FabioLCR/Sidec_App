import {Component, ViewEncapsulation, Input, OnInit} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-inbox-descricao-solicitacao',
  templateUrl: './inbox-descricao-solicitacao.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./inbox-descricao-solicitacao.component.css']
})
export class InboxDescricaoSolicitacaoComponent implements OnInit {
  closeResult: string;
  @Input() value;
  
  constructor(private modalService: NgbModal) {}

  open(content){
    this.modalService.open(content, { windowClass: 'light-slate-gray', size: 'lg'});
  }

  ngOnInit() {
  }

}
