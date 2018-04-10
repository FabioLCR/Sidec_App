import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';
import esriLoader from 'esri-loader'


@Component({
  selector: 'app-inbox-grid',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './inbox-grid.component.html',
  styleUrls: ['./inbox-grid.component.css']
})

export class InboxGridComponent implements OnInit {

  constructor() { }

  private _name : string;

  @Input('filterName')
  set filterName(name : string) {
    this._name  = (name  && name.trim()) || '';
  }
  get filterName(): string { return this._name; }

  ngOnInit() {
    const options = {
      url: 'https://js.arcgis.com/3.23/',
      css: 'https://js.arcgis.com/4.6/esri/css/main.css'
    };

    esriLoader.loadScript(options);
    esriLoader.loadModules(
      ["esri/layers/FeatureLayer",
        "esri/dijit/FeatureTable",
        "dojo/dom",
        "dojo/parser",
        "dojo/ready",]).then(([FeatureLayer, FeatureTable, dom, parser, ready]) => {
          parser.parse();

          ready( () => {
            // Create the feature layer
            var myFeatureLayer = new FeatureLayer("https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/california_census_blocks/FeatureServer/0", {
              mode: FeatureLayer.MODE_ONDEMAND,
              outFields: ["*"],
              visible: true,
              id: "fLayer",
            });
   
            myFeatureLayer.setDefinitionExpression("NAME like '%" + this.filterName + "%'");

            var myTable = new FeatureTable({
              featureLayer: myFeatureLayer,
              showGridMenu: true,
              gridOptions: {
                noDataMessage: "No Data",
                allowSelectAll: false,
                cellNavigation: false,
                selectionMode: "extended",
                pagination: true,
                allowTextSelection: true,
                pageSizeOptions: [10, 25, 50]
              },
              hiddenFields: ["FID", "C_Seq", "Street"]  // field that end-user can show, but is hidden on startup
            }, "myTableNode");

            myTable.startup();
            myTable.refresh();
          });
        });

  }

}
