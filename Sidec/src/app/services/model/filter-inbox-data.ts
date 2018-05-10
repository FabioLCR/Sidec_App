import { SidecDomains } from "../esri/sidec-domains.service";
import { and } from "@angular/router/src/utils/collection";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct";

/**
 * A model for an individual inbox item data
 */
export class FilterInboxData {

    agente: string;
    etapa: string;
    data: string;
    texto: string;
    where: string;

    constructor() { }

    public setAgente(agente: string) {
        if (agente != null && agente != 'Todos') {
            this.agente = agente;
        }
        else
        {
            this.agente = null;
        }
    }

    public setEtapa(etapa: string) {
        if (etapa != null && etapa != 'Todas') {
            this.etapa = etapa;
        }
        else
        {
            this.etapa = null;
        }
    }

    public setData(data: NgbDateStruct) {
        if (data != null) {
            this.data = `${data.year}-${data.month}-${data.day}`
        }
        else
        {
            this.data = null;
        }
    }

    public setPesquisa(texto: string) {
        if (texto.trim() != null) {
            this.texto = texto;
        }
        else
        {
            this.texto = null;
        }
    }

    public getSQLStetment(): string {
        this.where = '1=1';
        //primeira parte: Especifica
        if (this.agente != '' || this.etapa != '' || this.data != null) {
            this.where = '(';
            if (this.agente != '') {
                this.where += "(tx_respetapa = '" + this.agente + "')";
            }
            
            if (this.etapa != '') {
                if (this.where !== '(') {
                    this.where += ' And '
                }
                this.where += '(li_etapa = ' + this.etapa + ')';                
            }
            
            if (this.data != null) {
                if (this.where !== '(') {
                    this.where += ' And '
                }
                this.where += "(dt_dtinbox = '" + this.data + "')";                
            }
            this.where += ')';
        }
        return this.where;
    }
}