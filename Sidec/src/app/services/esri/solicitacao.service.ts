import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";
import esriLoader from 'esri-loader';
import { SolicitacaoData } from '../model/solicitacao-data';

@Injectable()
export class SolicitacaoService {

  private subject: Subject<SolicitacaoData>;

  
  constructor() { this.subject = new Subject<SolicitacaoData>();}

  /**
   * Método para recuperar dados da solicitação pelo número da solicitação
   * @param nsol Número da solicitação
   * @returns {any} Classe com dados da solicitação
   */
  public getByNSol($nsol: number): Observable<SolicitacaoData> {
    var sol: SolicitacaoData;

    esriLoader.loadModules(
      ["esri/layers/FeatureLayer",
        "esri/tasks/QueryTask",
        "esri/tasks/support/Query",
        "dojo/domReady!"
      ]).then(
        ([FeatureLayer, QueryTask, Query]) => {

          var queryTask = new QueryTask({
            url: "http://noteimg423.img.local/arcgis/rest/services/DESENV/SIDEC/FeatureServer/0",
          });
          var query = new Query({
            outFields: ["*"],
            where: "li_nsolicitacao=" + $nsol
          });
          queryTask.execute(query).then((data) => {
            sol = new SolicitacaoData($nsol,
            data.features[0].attributes.dt_dtsolicitacao,
            data.features[0].attributes.li_cobrade,
            data.features[0].attributes.tx_motalegado,
            data.features[0].attributes.tx_respreg,
            data.features[0].attributes.li_situacao,
            data.features[0].attributes.t_obs,
            data.features[0].attributes.tx_nmsolicitante
          );
            // console.log(sol.data.toLocaleString());
            // console.log(sol.cobrade);
            // console.log(sol.motivo_alegado);
            // console.log(sol.agente);
            // console.log(sol.situacao);
            // console.log(sol.esclarecimento);
            this.subject.next(sol);
            //setTimeout(() => {
             // this.subject.next(sol);  
            //}, 1500);
          });
        });
    return this.subject;
  }
}
