import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';

//var $: any;
@Component({
  selector: '[cobrade-selecao]',
  templateUrl: './cobrade-selecao.component.html',
  styleUrls: ['./cobrade-selecao.component.css']
})


export class CobradeSelecaoComponent implements OnInit {

  @Output() onCobradeReturn = new EventEmitter();

  ispageload;
  cobrade_parcial = '';
  modalRef: NgbModalRef;
  constructor(private modalService: NgbModal) {

  }

  ngOnInit() {
    this.ispageload = true;
  }

  openCobrade(content) {
    this.modalRef = this.modalService.open(content, { windowClass: 'light-slate-gray', size: 'lg' });
  }



  selectedCobrade(cobrade) {
    this.onCobradeReturn.emit(cobrade);
    this.modalRef.close();
  }

  onIsLoaded(event) {
    //Trocar para JQuery futuramente, porque n-if apesar de funcionar gera 'erro'
    //no Console da página
    $( '.modal-load' ).hide();
    //this.ispageload = false;

  }

  onReceiveCobrade(cobrade:string) {
    this.cobrade_parcial = cobrade.toString();
    if (cobrade.length >= 9) {
      setTimeout(() => {
        this.selectedCobrade(cobrade);  
      }, 300);
      
    }
  }
}
