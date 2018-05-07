import { SidecDomains } from "../esri/sidec-domains.service";

/**
 * A model for an individual inbox item data
 */
export class InboxData {
    solicitacao: number;
    data: string;
    cobrade: string;
    motivo_alegado: string;
    solicitante: string;
    situacao: string;
    etapa: string;

    constructor(solicitacao: number,
                data: Date,
                cobrade: string,
                motivo_alegado: string,
                solicitante: string,
                situacao: string,
                etapa: string) {

        var dataAttr = new Date( data )
        dataAttr = new Date(dataAttr.getTime() + dataAttr.getTimezoneOffset() * 60000);

        this.solicitacao = solicitacao;
        this.data = dataAttr.toLocaleString();
        this.cobrade = SidecDomains.DC_COBRADE.find(x => x.code === cobrade).name;
        this.motivo_alegado = motivo_alegado;
        this.solicitante = solicitante;
        this.situacao = SidecDomains.DC_SITUACAO.find(x => x.code === situacao).name;
        this.etapa = SidecDomains.DC_ETAPA_CHAMADO.find(x => x.code === etapa).name;
    }
}