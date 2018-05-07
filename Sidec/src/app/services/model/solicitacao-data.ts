/**
 * Classe com dados de uma solicitação (Atributos podem ser adicionados na medida da necessidade)
 */
export class SolicitacaoData {
    nsol: number;
    data: Date;
    cobrade: string;
    motivo_alegado: string;
    agente: string;
    situacao: number;
    esclarecimento: string; 
    solicitante: string;

    constructor(nsol: number,
                data: Date,
                cobrade: string,
                motivo_alegado: string,
                agente: string,
                situacao: number,
                esclarecimento: string,
                solicitante: string) {

        this.nsol = nsol;

        var dataAttr = new Date( data )
        dataAttr = new Date(dataAttr.getTime() + dataAttr.getTimezoneOffset() * 60000);
        this.data = dataAttr;

        this.cobrade = cobrade;
        this.motivo_alegado = motivo_alegado;
        this.agente = agente;
        this.situacao = situacao;
        this.esclarecimento = esclarecimento;
        this.solicitante = solicitante;
    }
}