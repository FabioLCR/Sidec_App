import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";
import esriLoader from 'esri-loader';
import { SolicitacaoData } from '../model/solicitacao-data';

@Injectable()
export class SolicitacaoService {

  private subject: Subject<SolicitacaoData>;


  constructor() { this.subject = new Subject<SolicitacaoData>(); }
  sol: SolicitacaoData
  /**
   * Método para recuperar dados da solicitação pelo número da solicitação
   * @param nsol Número da solicitação
   * @returns {any} Classe com dados da solicitação
   */
  public getByNSol($nsol: number): Observable<SolicitacaoData> {
    this.sol = null;

    esriLoader.loadModules(
      ["esri/tasks/QueryTask",
        "esri/tasks/support/Query",
        "dojo/domReady!"
      ]).then(
        ([QueryTask, Query]) => {

          var queryTask = new QueryTask({
            url: "http://noteimg423.img.local/arcgis/rest/services/DESENV/SIDEC/FeatureServer/0",
            //url: "http://p110civitas.img.com.br/arcgis/rest/services/SIDEC/SIDEC/FeatureServer/0",
          });
          var query = new Query({
            outFields: ["*"],
            where: "li_nsolicitacao=" + $nsol
          });
          queryTask.execute(query).then((data) => {
            this.sol = new SolicitacaoData($nsol,
              data.features[0].attributes.dt_dtsolicitacao,
              data.features[0].attributes.li_cobrade,
              data.features[0].attributes.tx_motalegado,
              data.features[0].attributes.tx_respreg,
              data.features[0].attributes.li_situacao,
              data.features[0].attributes.tx_obs,
              data.features[0].attributes.tx_nmsolicitante
            );
            this.subject.next(this.sol);
            this.subject.complete()
            //setTimeout(() => {
            // this.subject.next(sol);  
            //}, 1500);
          });
        });
    return this.subject;
  }
}
