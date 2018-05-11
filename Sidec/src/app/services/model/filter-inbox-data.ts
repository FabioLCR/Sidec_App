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
        else {
            this.agente = null;
        }
    }

    public setEtapa(etapa: string) {
        if (etapa != null && etapa != 'Todas') {
            this.etapa = etapa;
        }
        else {
            this.etapa = null;
        }
    }

    public setData(data: NgbDateStruct) {
        if (data != null) {
            this.data = `${data.year}-${this.pad(data.month, 2)}-${data.day}`
        }
        else {
            this.data = null;
        }
    }

    public setPesquisa(texto: string) {
        if (texto.trim() != null) {
            this.texto = texto;
        }
        else {
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
                this.where += "(dt_dtinbox LIKE '%" + this.data + "%')";
            }
            this.where += ')';
        }

        //segunda parte: Geral
        if (this.texto != '') {
            this.texto = this.texto.toUpperCase();

            if (this.where !== '1=1') {
                this.where += ' And '
            }
            else {
                this.where = '';
            }
            this.where += '(';
            //Solicitação
            this.where += "(UPPER(li_nsolicitacao) LIKE '%" + this.texto + "%')";

            //Data

            var _texto: string = this.texto.replace(/\//g, '-');
            var _date: string[] = _texto.split('-');

            //_texto = _texto.replace(/(\w\w)\-(\w\w)\-(\w\w\w\w)(.*)/, '$3-$2-$1$4')

            var _texto: string;
            switch (_date.length) {
                case 2:
                    _texto = _texto.replace(/(\w*)\-(\w*)/, '$2-$1');
                    break;
                case 3:
                    _texto = _texto.replace(/(\w*)\-(\w*)\-(\w*)/, '$3-$2-$1');
                    break;
                default:
                    if (_texto.match('.') != null) {
                        _texto = '';
                    }
                    break;
            }
            if (_texto !== '') {
                this.where += ' Or '
                this.where += "(dt_dtinbox LIKE '%" + _texto + "%')";
            }
            //COBRADE
            var lista: number[] = [];
            for (let index = 0; index < SidecDomains.DC_COBRADE.length; index++) {
                const _cobrade = SidecDomains.DC_COBRADE[index];
                if (_cobrade.name.toUpperCase().match(this.texto) != null) {
                    lista.push(_cobrade.code);
                }
            };

            for (let index = 0; index < lista.length; index++) {
                if (index === 0) {
                    this.where += ' Or '
                    this.where += "(li_cobrade IN(";

                    this.where += lista[index];
                }
                else {
                    this.where += ', ' + lista[index];
                }
            }
            if (lista.length > 0) {
                this.where += "))";
            }

            //Motivo alegado
            this.where += ' Or '
            this.where += "(UPPER(tx_motalegado) LIKE '%" + this.texto + "%')";

            //Solicitação
            this.where += ' Or '
            this.where += "(li_nsolicitacao LIKE '%" + this.texto + "%')";

            //Situação
            lista = [];
            for (let index = 0; index < SidecDomains.DC_SITUACAO.length; index++) {
                const _situacao = SidecDomains.DC_SITUACAO[index];
                if (_situacao.name.toUpperCase().match(this.texto) != null) {
                    lista.push(_situacao.code);
                }
            };

            for (let index = 0; index < lista.length; index++) {
                if (index === 0) {
                    this.where += ' Or '
                    this.where += "(li_situacao IN(";

                    this.where += lista[index];
                }
                else {
                    this.where += ', ' + lista[index];
                }
            }
            if (lista.length > 0) {
                this.where += "))";
            }
            
            //ETAPA
            lista = [];
            for (let index = 0; index < SidecDomains.DC_ETAPA_CHAMADO.length; index++) {
                const _etapa = SidecDomains.DC_ETAPA_CHAMADO[index];
                if (_etapa.name.toUpperCase().match(this.texto) != null) {
                    lista.push(_etapa.code);
                }
            };

            for (let index = 0; index < lista.length; index++) {
                if (index === 0) {
                    this.where += ' Or '
                    this.where += "(li_etapa IN(";

                    this.where += lista[index];
                }
                else {
                    this.where += ', ' + lista[index];
                }
            }
            if (lista.length > 0) {
                this.where += "))";
            }

            this.where += ')';
        }
        return this.where;
    }

    pad(n, len): string {
        var num = parseInt(n, 10);
        len = parseInt(len, 10);
        return (isNaN(num) || isNaN(len)) ? n : (1e10 + "" + num).slice(-len);
    };
}