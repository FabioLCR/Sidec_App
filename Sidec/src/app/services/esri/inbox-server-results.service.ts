import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { PagedData } from "../model/paged-data";
import { InboxData } from '../model/inbox-data'
import { Page } from "../model/page";
const companyData = require('../../../assets/data/company.json');

import esriLoader from 'esri-loader'

const options = {
  url: 'https://js.arcgis.com/3.23/',
  css: 'https://js.arcgis.com/4.6/esri/css/main.css'
};

@Injectable()
export class InboxServerResultsService {

  private subject: Subject<PagedData<InboxData>>;

  constructor() {
    esriLoader.loadScript(options);
    this.subject = new Subject<PagedData<InboxData>>();
  }

  /**
   * A method that mocks a paged server response
   * @param page The selected page
   * @returns {any} An observable containing the employee data
   */
  public getResults(page: Page): Observable<PagedData<InboxData>> {
    this.getPagedData(page);
    return this.subject;
  }

  /**
   * Package companyData into a PagedData object based on the selected Page
   * @param page The page data used to get the selected data from companyData
   * @returns {PagedData<CorporateEmployee>} An array of the selected data and page
   */
  private getPagedData(page: Page): PagedData<InboxData> {
    //Aqui é onde vai olhar o serviço de acordo com a página
    let pagedData = new PagedData<InboxData>();

    
    esriLoader.loadModules(
      ["esri/layers/FeatureLayer",
        "dojo/on",
        "dojo/parser",
        "esri/tasks/query",
        "dojo/Deferred",
      ]).then(
        ([FeatureLayer, on, parser, Query, Deferred]) => {
          parser.parse();

          var featureLayer = new FeatureLayer("http://noteimg423.img.local/arcgis/rest/services/DESENV/SIDEC/FeatureServer/2", {
            mode: FeatureLayer.MODE_AUTO,
            "outFields": ["*"]
          });

          featureLayer.setDefinitionExpression("1=1");
          getFeatureCnt().then((len) => {
            page.totalElements = len;
            page.totalPages = page.totalElements / page.size;
            let start = page.pageNumber * page.size;
            //Preencher os registros da página;
            let end = Math.min((start + page.size), page.totalElements);
            getFeatureData().then((data) => {
              data.features[2].attr().attributes["tx_nmsolicitante"]
              for (let i = start; i < end; i++) {
                let inboxData = new InboxData(
                  data.features[i].attr().attributes["li_nsolicitacao"],
                  data.features[i].attr().attributes["dt_dtinbox"],
                  data.features[i].attr().attributes["li_cobrade"],
                  data.features[i].attr().attributes["tx_motalegado"],
                  data.features[i].attr().attributes["tx_nmsolicitante"],
                  data.features[i].attr().attributes["li_situacao"],
                  data.features[i].attr().attributes["li_etapa"]                  
                );
                //let employee = new InboxData(jsonObj.name, jsonObj.gender, jsonObj.company, jsonObj.age);
                pagedData.data.push(inboxData);
                pagedData.page = page;
                
              }
              this.subject.next(pagedData);
            });
            

          });

          function getFeatureCnt() {
            var query = new Query();
            query.where = featureLayer.getDefinitionExpression();
            var def = new Deferred();
            featureLayer.queryCount(query, function (count) {
              def.resolve(count);
            });
            return def;
          }

          function getFeatureData() {
            var query = new Query();
            query.where = featureLayer.getDefinitionExpression();
            var def = new Deferred();
            featureLayer.queryFeatures(query, function (data) {
              def.resolve(data);
            });
            return def;
          }
        });
        
    return pagedData;
  }
}
