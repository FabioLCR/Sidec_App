import { Injectable, ChangeDetectorRef } from "@angular/core";
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
  private whereTxt: string;
  constructor(private cd: ChangeDetectorRef) {
    if (!esriLoader.isLoaded()) {
      esriLoader.loadScript(options);
    }
    this.subject = new Subject<PagedData<InboxData>>();
    this.whereTxt = '1=1';
  }

  public setWhere(whereTxt:string) {
    this.whereTxt = whereTxt;
  }

  /**
   * A method that mocks a paged server response
   * @param page The selected page
   * @returns {any} An observable containing the employee data
   */
  public getResults(page: Page): Observable<PagedData<InboxData>> {
    this.subject = new Subject<PagedData<InboxData>>();
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
    pagedData.page = page;
    this.subject.next(pagedData);

    esriLoader.loadModules(
      ["esri/layers/FeatureLayer",
       "esri/tasks/QueryTask",
       "esri/tasks/support/Query",
       "dojo/domReady!"
      ]).then(
        ([FeatureLayer, QueryTask, Query] ) => {

          var queryTask = new QueryTask({
            url: "http://noteimg423.img.local/arcgis/rest/services/DESENV/SIDEC/FeatureServer/2",
            //url: "http://p110civitas.img.com.br/arcgis/rest/services/SIDEC/SIDEC/FeatureServer/1",
          });
          var query = new Query({
            orderByFields: [ "dt_dtinbox DESC" ],
            outFields: ["*"],
            where: this.whereTxt// + "and tx_respetapa not in ('emergencia', 'brunolc', 'Luize')"
          });

          queryTask.executeForCount(query).then((count) => {
            pagedData.page.totalElements = count;
            pagedData.page.totalPages = pagedData.page.totalElements / pagedData.page.size;
            //Preencher os registros da página;
            //let end = Math.min((start + page.size), page.totalElements);
            query.start = pagedData.page.pageNumber * pagedData.page.size;
            query.num = pagedData.page.size;
            
            queryTask.execute(query).then((data) => {
              
              for (let i = 0; i < data.features.length; i++) {
                let inboxData = new InboxData(
                  data.features[i].attributes.li_nsolicitacao,
                  data.features[i].attributes.dt_dtinbox,
                  data.features[i].attributes.li_cobrade,
                  data.features[i].attributes.tx_motalegado,
                  data.features[i].attributes.tx_nmsolicitante,
                  data.features[i].attributes.li_situacao,
                  data.features[i].attributes.li_etapa,
                  data.features[i].attributes.tx_respetapa
                );
                pagedData.data.push(inboxData);
                this.subject.next(pagedData);                  
              }
              //setTimeout(() => {
                //this.subject.next(pagedData);  
                this.subject.complete();
                
              //}, 10);
            });
            

          });
        });
        
    return pagedData;
  }
}
