import { Injectable } from '@angular/core';
import esriLoader from 'esri-loader';

const options = {
  url: 'https://js.arcgis.com/4.7/',
  css: 'https://js.arcgis.com/4.7/esri/css/main.css'
};

@Injectable()
export class SidecDomainsService {


  constructor() {
    if (!esriLoader.isLoaded()) {
      esriLoader.loadScript(options);
    }
  }

  static role = 'vazio';

  initialize() {
    SidecDomainsService.role = 'teste';
    // esriLoader.loadModules(
    //   ["esri/layers/FeatureLayer"]
    // ).then(
    //   ([FeatureLayer]) => {

    //   });
  }
}
