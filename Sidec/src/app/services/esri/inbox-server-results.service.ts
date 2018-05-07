import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { PagedData } from "../model/paged-data";
import { InboxData } from '../model/inbox-data'
import { Page } from "../model/page";

import esriLoader from 'esri-loader'
import { DatatableComponent } from "@swimlane/ngx-datatable";

const options = {
  url: 'https://js.arcgis.com/4.7/',
  css: 'https://js.arcgis.com/4.7/esri/css/main.css'
};

@Injectable()
export class InboxServerResultsService {

  private subject: Subject<PagedData<InboxData>>;

  constructor() {
    if (!esriLoader.isLoaded()) {
      esriLoader.loadScript(options);
    }
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
       "esri/tasks/QueryTask",
       "esri/tasks/support/Query",
       "dojo/domReady!"
      ]).then(
        ([FeatureLayer, QueryTask, Query] ) => {

          var queryTask = new QueryTask({
            url: "http://noteimg423.img.local/arcgis/rest/services/DESENV/SIDEC/FeatureServer/2",
          });
          var query = new Query({
            orderByFields: [ "dt_dtinbox DESC" ],
            outFields: ["*"],
            where: "1=1"
          });

          queryTask.executeForCount(query).then((count) => {
            page.totalElements = count;
            page.totalPages = page.totalElements / page.size;
            //Preencher os registros da página;
            //let end = Math.min((start + page.size), page.totalElements);
            query.start = page.pageNumber * page.size;
            query.num = page.size;
            
            queryTask.execute(query).then((data) => {
              
              for (let i = 0; i < data.features.length; i++) {
                let inboxData = new InboxData(
                  data.features[i].attributes.li_nsolicitacao,
                  data.features[i].attributes.dt_dtinbox,
                  data.features[i].attributes.li_cobrade,
                  data.features[i].attributes.tx_motalegado,
                  data.features[i].attributes.tx_nmsolicitante,
                  data.features[i].attributes.li_situacao,
                  data.features[i].attributes.li_etapa                 
                );
                pagedData.data.push(inboxData);
                pagedData.page = page;                
              }
              //setTimeout(() => {
                this.subject.next(pagedData);  
              //}, 10);
            });
            

          });
        });
        
    return pagedData;
  }
}
