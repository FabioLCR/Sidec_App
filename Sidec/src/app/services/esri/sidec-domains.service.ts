import { Injectable } from '@angular/core';
import esriLoader from 'esri-loader';
import { debug } from 'util';

const options = {
  url: 'https://js.arcgis.com/4.7/',
  css: 'https://js.arcgis.com/4.7/esri/css/main.css'
};

@Injectable()
export class SidecDomains {


  constructor() {
    if (!esriLoader.isLoaded()) {
      esriLoader.loadScript(options);
    }
  }

  static DC_COBRADE;
  static DC_SITUACAO;
  static DC_CAPTACAO;
  static DC_DOCUMENTO;
  static DM_BAIRRO;
  static DC_AA_MOTIVO;
  static DC_AA_LOCAIS;
  static DC_AA_CRITICIDADE;
  static DC_AA_STATENDIMENTO;
  static DC_AA_PRONTO;
  static DC_ETAPA_CHAMADO;

  initialize() {
    var codedValues;
    esriLoader.loadModules(
      ["esri/request"]
    ).then(
      ([esriRequest]) => {
        esriRequest("http://noteimg423.img.local/arcgis/rest/services/DESENV/SIDEC/FeatureServer/queryDomains", {
          responseType: "json",
          method: "post",
          query: {
            f: 'json',
            layers: "[2, 1, 0]"
          },
        }).then((response) => {

          // The requested data
          var domains = response.data.domains;
          domains.forEach(domain => {
            codedValues = domain.codedValues
           
            console.log(domain.name);
            switch (domain.name) {
              case 'DC_COBRADE':
                SidecDomains.DC_COBRADE = codedValues;
                //alert(this.DC_COBRADE.find(x => x.code === 11).name);
                break;
              case 'DC_SITUACAO':
                SidecDomains.DC_SITUACAO = codedValues;
                break;
              case 'DC_CAPTACAO':
                SidecDomains.DC_CAPTACAO = codedValues;
                break;
              case 'DC_DOCUMENTO':
                SidecDomains.DC_DOCUMENTO = codedValues;
                break;
              case 'DM_BAIRRO':
                SidecDomains.DM_BAIRRO = codedValues;
                break;
              case 'DC_AA_MOTIVO':
                SidecDomains.DC_AA_MOTIVO = codedValues;
                break;
              case 'DC_AA_LOCAIS':
                SidecDomains.DC_AA_LOCAIS = codedValues;
                break;
              case 'DC_AA_CRITICIDADE':
                SidecDomains.DC_AA_CRITICIDADE = codedValues;
                break;
              case 'DC_AA_STATENDIMENTO':
                SidecDomains.DC_AA_STATENDIMENTO = codedValues;
                //alert(SidecDomainsService.DC_AA_STATENDIMENTO.find(x => x.code === 11).name);
                break;
              case 'DC_AA_PRONTO':
                SidecDomains.DC_AA_PRONTO = codedValues;
                break;
              case 'DC_ETAPA_CHAMADO':
                SidecDomains.DC_ETAPA_CHAMADO = codedValues;
                break;
              default:
            }
          });
        });
      });
  }
}


/*
DC_COBRADE
DC_SITUACAO
DC_CAPTACAO
DC_DOCUMENTO
DM_BAIRRO
DC_AA_MOTIVO
DC_AA_LOCAIS
DC_AA_CRITICIDADE
DC_AA_STATENDIMENTO
DC_AA_PRONTO

*/