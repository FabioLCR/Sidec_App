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

        this.solicitacao = solicitacao;
        this.data = data.toLocaleString();
        this.cobrade = cobrade;
        this.motivo_alegado = motivo_alegado;
        this.solicitante = solicitante;
        this.situacao = situacao;
        this.etapa = etapa;
    }
}