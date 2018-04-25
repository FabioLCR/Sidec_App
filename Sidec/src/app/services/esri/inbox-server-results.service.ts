import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { PagedData } from "../model/paged-data";
import { InboxData } from '../model/inbox-data'
import { Page } from "../model/page";
const companyData = require('../../../assets/data/company.json');

import esriLoader from 'esri-loader'
import { DatatableComponent } from "@swimlane/ngx-datatable";

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
   * Package inboxData into a InboxData object based on the selected Page
   * @param page The page data used to get the selected data from inboxData
   * @returns {PagedData<InboxData>} An array of the selected data and page
   */
  private getPagedData(page: Page): PagedData<InboxData> {
    //Aqui é onde vai olhar o serviço de acordo com a página
    let pagedData = new PagedData<InboxData>();

    esriLoader.loadModules(
      ["esri/layers/FeatureLayer",
        "esri/InfoTemplate",
        "dojo/on",
        "dojo/parser",
        "esri/tasks/query",
        "dojo/Deferred",
      ]).then(
        ([FeatureLayer, InfoTemplate, on, parser, Query, Deferred] ) => {
          parser.parse();

          var featureLayer = new FeatureLayer("http://noteimg423.img.local/arcgis/rest/services/DESENV/SIDEC/FeatureServer/2", {
            mode: FeatureLayer.MODE_AUTO,
            "orderByFields" : [ "dt_dtinbox DESC" ],
            "outFields": ["*"]
          });
          
          
          
          featureLayer.setDefinitionExpression("1=1");
          getFeatureCnt().then((len) => {
            page.totalElements = len;
            page.totalPages = page.totalElements / page.size;
            let start = page.pageNumber * page.size;
            //Preencher os registros da página;
            //let end = Math.min((start + page.size), page.totalElements);

            getFeatureData(start, page.size).then((data) => {
              
              for (let i = 0; i < data.features.length; i++) {
                var dataAttr = new Date(  data.features[i].attr().attributes["dt_dtinbox"] )
                dataAttr = new Date(dataAttr.getTime() + dataAttr.getTimezoneOffset() * 60000);
                
                let inboxData = new InboxData(
                  data.features[i].attr().attributes["li_nsolicitacao"],
                  dataAttr,
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
              //setTimeout(() => {
                this.subject.next(pagedData);  
              //}, 1000);
              
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

          function getFeatureData(start, num) {
            var query = new Query();
            query.where = featureLayer.getDefinitionExpression();
            query.start = start;
            query.num = num;
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
