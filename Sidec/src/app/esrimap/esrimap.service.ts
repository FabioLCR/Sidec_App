import { Injectable } from "@angular/core";
import { isLoaded, loadModules } from 'esri-loader';
import { environment } from '../../environments/environment';

//import { EventsService } from 'angular4-events';

@Injectable()
export class EsrimapService {

  public webMap:any;
  public mapView:any;
  public homeLocation:any;

  constructor(/*private events: EventsService*/) {
  }

  public loadMap(id:string){

    loadModules(['esri/views/MapView',
                  'esri/WebMap',
                  'esri/config',
                  'esri/identity/IdentityManager'
    ]).then(([MapView, WebMap, esriConfig, esriId]) => {

          /*esriConfig.portalUrl = environment.portalItem.url;*/

          this.webMap = new WebMap({
            /*portalItem: {
              id: environment.portalItem.id
            }*/
          });

          this.mapView = new MapView({
            map: this.webMap,
            container: id
            /*zoom: 10,
            extent: environment.portalItem.extent*/
          });

          this.mapView.when(() => {
            this.mapView.map.allLayers.map(layer => {
              /*if(layer.url != environment.arcgisServer.url + environment.arcgisServer.layers.basemap)
                layer.visible = false;*/
            });
          });

          this.loadWidgetSearch();
          this.loadWidgetLocate();
          this.registerClick();
    })
    .catch(err => {
        console.error(err);
    });
  }

  public loadWidgetSearch(){
    loadModules([ "esri/widgets/Search",
                  "esri/tasks/Locator",
                  "esri/symbols/PictureMarkerSymbol"
    ]).then(([Search, Locator, PictureMarkerSymbol]) => {

          /*var search = new Search({
             view: this.mapView,
             locationEnabled: false,
             popupEnabled:false,
             popupOpenOnSelect:false,
             sources: [{
               locator: new Locator({ url: environment.geocodeServer }),
               placeholder: "Insira seu endereço",
               resultSymbol: environment.homeLocationSymbol
             }]
           });
           search.on("search-start", event => {
               this.mapView.graphics.removeAll();
           });*/
           /*search.on("search-complete", event => {
              this.homeLocation = event.results[0].results[0].feature;
              this.homeLocation.symbol = new PictureMarkerSymbol(environment.homeLocationSymbol);
              this.events.publish('homeLocation', this.homeLocation);
           });*/
           //search.defaultSource.withinViewEnabled = true; // Limit search to visible map area only
           /*this.mapView.ui.add(search, "top-right");*/
     })
     .catch(err => {
         console.error(err);
     });
  }

  public loadWidgetLocate(){
    loadModules([ "esri/widgets/Locate",
                  "esri/Graphic"
    ]).then(([Locate, Graphic]) => {

         /* var locate = new Locate({
            view: this.mapView,
            graphic: new Graphic({
              symbol: environment.homeLocationSymbol
            })
          });
          this.mapView.ui.add(locate, "top-left");

          locate.on("locate", event => {
              this.homeLocation = event.target.graphic;
              this.mapView.graphics.removeAll();
              this.mapView.graphics.add(this.homeLocation);
              this.events.publish('homeLocation', this.homeLocation);
          });*/
    })
    .catch(err => {
        console.error(err);
    });
  }

  public registerClick(){
    loadModules([ "esri/Graphic",
                  "esri/symbols/PictureMarkerSymbol"
    ]).then(([Graphic,PictureMarkerSymbol]) => {

        /*this.mapView.on("click", event => {
            let symbol = new PictureMarkerSymbol(environment.homeLocationSymbol);
            this.mapView.graphics.removeAll();
            this.homeLocation = new Graphic({
              geometry:event.mapPoint,
              symbol:symbol
            });
            this.mapView.graphics.add(this.homeLocation);
            this.events.publish('homeLocation', this.homeLocation);
       });*/
     })
     .catch(err => {
         console.error(err);
     });
  }
}
