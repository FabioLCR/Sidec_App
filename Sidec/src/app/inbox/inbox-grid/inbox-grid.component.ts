import { Component, ViewEncapsulation, Input, OnInit, OnDestroy } from '@angular/core';
import { NgClass } from '@angular/common';
import esriLoader from 'esri-loader'
import { format } from 'util';
import { Router } from '@angular/router';
import { fakeAsync } from '@angular/core/testing';

@Component({
  selector: 'app-inbox-grid',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './inbox-grid.component.html',
  styleUrls: ['./inbox-grid.component.css']
})

export class InboxGridComponent implements OnInit, OnDestroy {


  // you will not be able to edit callnumber field in this example. 
  
  constructor(public router: Router) { }

  private _name: string;
  private pencil = "teste";

  @Input('tamanho')
  private tamanho: boolean;

  @Input('filterName')

  set filterName(name: string) {
    this._name = (name && name.trim()) || '';
  }
  get filterName(): string { return this._name; }

  r_info(id:string)
  {
    this.router.navigate(['/NovaSolicitacao', id]);
  }

  r_edit(id:string)
  {
    this.router.navigate(['/Pesquisa', id]);
  }

  private myTable: any;

  ngOnDestroy() {
    this.myTable.destroy();
  }

  ngOnInit() {
    
    const options = {
      url: 'https://js.arcgis.com/3.23/',
      css: 'https://js.arcgis.com/4.6/esri/css/main.css'
    };

    var myInfoButton = {
      onClick: (evt) =>{
        this.r_info(evt.currentTarget.attributes.id.value);
      }
    };

    var myEditButton = {
      onClick: (evt) =>{
        this.r_edit(evt.currentTarget.attributes.id.value);
      }
    };
    
    
    esriLoader.loadScript(options);
    esriLoader.loadModules(
      ["esri/layers/FeatureLayer",
        "esri/dijit/FeatureTable",
        "dojo/dom",
        "dojo/parser",
        "dojo/ready",
        "dojo/query"]).then(([FeatureLayer, FeatureTable, dom, parser, ready, query]) => {
          parser.parse();

          

          ready(() => {

            // Create the feature layer
            var myFeatureLayer = new FeatureLayer("https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/california_census_blocks/FeatureServer/0", {
              mode: FeatureLayer.MODE_ONDEMAND,
              outFields: [ "NAME", "OBJECTID","GEOID", "MTFCC", "ALAND", "AWATER"],
              visible: true,
              id: "fLayer",
            });

            //myFeatureLayer.setDefinitionExpression("NAME like '%" + this.filterName + "%'");
    
              this.myTable = new FeatureTable({
              featureLayer: myFeatureLayer,
              showGridMenu: false,
              showGridHeader: false,
              gridOptions: {
                noDataMessage: "Sem ocorrências! (Caso não seja o caso tente atualizar a página!)",
                allowSelectAll: false,
                cellNavigation: false,
                selectionMode: 'single',
                pagination: true,
                allowTextSelection: true,
                pageSizeOptions: [10, 25, 50]
              },
              outFields: ["GEOID", "NAME", "MTFCC", "ALAND", "AWATER"],
              hiddenFields: ["MTFCC", "AWATER"],  // field that end-user can show, but is hidden on startup
              // use fieldInfos object to change field's label (column header), 
              // change the editability of the field, and to format how field values are displayed
              // you will not be able to edit callnumber field in this example. 
              fieldInfos: [
                {
                  name: 'OBJECTID',
                  alias: '#',
                  format: {
                    template: ` <div class="btn-group" role="group" aria-label="Basic example">
                                  <button id="${"${value}"}" type="button" class="btn btn-outline-secondary btn-sm info">
                                    <span class="glyphicon glyphicon-search">
                                  </button>
                                  <button id="${"${value}"}" type="button" class="btn btn-outline-secondary btn-sm edit">
                                    <span class="glyphicon glyphicon-pencil">
                                  </button>
                                </div>` //add mph at the of the value
                  }
                },
                {
                  name: 'NAME',
                  alias: 'Nome',
                  editable: false //disable editing on this field 
                },
                {
                  name: 'GEOID',
                  alias: ' ',
                  format: {
                      template: ` <div class="btn-group" role="group" aria-label="Basic example">
                                    <button id="${"${value}"}" type="button" class="btn btn-outline-secondary btn-sm info">
                                      <span class="glyphicon glyphicon-search">
                                    </button>
                                    <button id="${"${value}"}" type="button" class="btn btn-outline-secondary btn-sm edit">
                                      <span class="glyphicon glyphicon-pencil">
                                    </button>
                                  </div>` //add mph at the of the value
                  }
                },
                {
                  name: 'MTFCC',
                  alias: 'MTFCC',
                  format: {
                    template: "${value} mph"
                  }
                },
                {
                  name: 'LAND',
                  alias: 'ALAND...'
                },
                {
                  name: 'AWATER',
                  alias: 'WATER...'
                }
              ]
            }, "myTableNode");
            this.myTable.startup();

            this.myTable.on("load", (evt) => {
              //alert('load');
            });
            
            this.myTable.on("refresh", (evt) => {
              query(".clickMe").on("click", myEditButton.onClick);
            });

            this.myTable.on("show-related-records", (evt) => {
              alert('show-related-records');
            });

            this.myTable.on("data-change", (evt) => {
              alert('data-change');
            });

            this.myTable.on("editor-hide", (evt) => {
              alert('editor-hide');
            });

            this.myTable.on("editor-show", (evt) => {
              alert('editor-show');
            });

            this.myTable.on("edits-complete", (evt) => {
              alert('edits-complete');
            });

            this.myTable.on("error", (evt) => {
              alert('error');
            });

            this.myTable.on("filter", (evt) => {
              alert('filter');
            });

            this.myTable.on("row-select", (evt) => {
              query(".info").on("click",  myInfoButton.onClick);
              query(".edit").on("click",  myEditButton.onClick);
            });
          });
        });

  }

}
