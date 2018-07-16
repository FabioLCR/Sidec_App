import { Injectable, EventEmitter } from "@angular/core";
import esriLoader from 'esri-loader'
import { environment } from "../../environments/environment";
import { BehaviorSubject, Observable, Subject } from "rxjs";

const options = {
  url: 'https://js.arcgis.com/4.7/',
  css: 'https://js.arcgis.com/4.7/esri/css/main.css'
};

@Injectable()
export class EsrimapService {

  //Resultado
  public point: any;
  private subject: Subject<any>;
  //Evento
  public movePoint: any; //movePoint(Lat, Long)
  constructor() {
    this.subject = new Subject<any>();
    if (!esriLoader.isLoaded()) {
      esriLoader.loadScript(options);
    }
  }

  public loadMap(id: String, lat?: number, long?: number): Observable<any> { 
    esriLoader.loadModules(["esri/Map",
      "esri/views/MapView",
      "esri/symbols/support/jsonUtils",
      "esri/geometry/Point",
      "esri/Graphic",
      "esri/widgets/BasemapToggle",
      "dojo/parser",

      "dojo/domReady!"
    ]).then(([Map, MapView, jsonUtils, Point, Graphic, BasemapToggle, parser]) => {
      parser.parse();
      var webMap = new Map({
        basemap: "streets",
        ground: "world-elevation"
      });

      var mapView = new MapView({
        container: id,
        map: webMap,
        zoom: 13,
        center: [-43.05, -22.88] // longitude, latitude
      });

      var toggle = new BasemapToggle({
        view: mapView,
        nextBasemap: "hybrid"
      });
      // Adds an instance of BasemapToggle widget to the
      // top right of the view.
      mapView.ui.add(toggle, "top-right");

      this.point = new Point();
      /*var markerSymbol = new SimpleMarkerSymbol({
        style: SimpleMarkerSymbol.STYLE_DIAMOND,
        color: [226, 119, 40],
        outline: { 
          color: [255, 255, 255],
          width: 2
        }
      });*/

      var webStyleSymbol = jsonUtils.fromJSON({
        "angle":0,
        "xoffset":12,
        "yoffset":12,
        "type": "esriPMS",
        "imageData":"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",
        "contentType":"image/png",
        "width":24,
        "height":24
     });

      var pointGraphic = new Graphic({
        geometry: this.point,
        symbol: webStyleSymbol
      });
      // Add widget to the top right corner of the view
      
      mapView.when(() => {
        if (typeof lat !== "undefined" && typeof long !== "undefined") {
          this.movePoint(lat, long);
          mapView.center = [long, lat];
          mapView.zoom = 17;
        }
      });

      mapView.on("click", event => {
        if (event.button == 0)
        {
          this.movePoint(event.mapPoint.latitude, event.mapPoint.longitude);
          this.subject.next({"ponto": event.mapPoint, "latitude": event.mapPoint.latitude, "longitude": event.mapPoint.longitude});
        }
      });

      this.movePoint = (lat, lon) => {
        mapView.graphics.remove(pointGraphic);
        this.point.latitude = lat;
        this.point.longitude = lon;
        pointGraphic = new Graphic({
          geometry: this.point,
          symbol: webStyleSymbol
        });
        mapView.graphics.add(pointGraphic);
      }

    })
      .catch(err => {
        console.error(err);
      });
      return this.subject;
  }
}
