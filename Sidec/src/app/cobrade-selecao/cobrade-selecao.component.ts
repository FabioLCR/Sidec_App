import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SidecDomains } from '../services/esri/sidec-domains.service';

@Component({
  selector: '[cobrade-selecao]',
  templateUrl: './cobrade-selecao.component.html',
  styleUrls: ['./cobrade-selecao.component.css']
})

export class CobradeSelecaoComponent implements OnInit {
  @Output() onCobradeReturn = new EventEmitter();

  ispageload;
  modalRef:NgbModalRef ;
  cobrades = [];
  constructor(private modalService: NgbModal) {
    this.ispageload = false;
    this.cobrades = SidecDomains.DC_COBRADE;
   }

  ngOnInit() {
    
  }

  

  openCobrade(content) {
    this.ispageload = true;
    
    this.modalRef = this.modalService.open(content, { windowClass: 'light-slate-gray', size: 'lg' });
    this.ispageload = false;
  }

  selectedCobrade(cobrade){   
    this.onCobradeReturn.emit(cobrade);
    this.modalRef.close();
  }

}
