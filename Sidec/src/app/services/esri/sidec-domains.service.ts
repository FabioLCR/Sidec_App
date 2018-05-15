import { Injectable } from '@angular/core';
import esriLoader from 'esri-loader';
import { debug } from 'util';
import { Observable, Subject } from 'rxjs';

const options = {
  url: 'https://js.arcgis.com/4.7/',
  css: 'https://js.arcgis.com/4.7/esri/css/main.css'
};

@Injectable()
export class SidecDomains {
  private subject: Subject<string>;

  constructor() {
    if (!esriLoader.isLoaded()) {
      esriLoader.loadScript(options);
      this.subject = new Subject();
    }
  }
  static refreshIntervalId = null;
  static DC_COBRADE = null;
  static DC_SITUACAO = null;
  static DC_CAPTACAO = null;
  static DC_DOCUMENTO = null;
  static DM_BAIRRO = null;
  static DC_AA_MOTIVO = null;
  static DC_AA_LOCAIS = null;
  static DC_AA_CRITICIDADE = null;
  static DC_AA_STATENDIMENTO = null;
  static DC_AA_PRONTO = null;
  static DC_ETAPA_CHAMADO = null;
  //Pegar do Keycloak posteriormente
  static DC_AGENTES = null; 

  static initialized = false;

  initialize(): Observable<string> {
    this.subject.next('Loading DC_AGENTES');
    SidecDomains.DC_AGENTES = [
      {code: 'Fabio', name: 'Fábio Luiz Cortez Ribeiro'},
      {code: 'Julio', name: 'Julio Bandeira Guerra'},
      {code: 'Geraldi', name: 'Eduardo Henrique Geraldi Araujo'},
      {code: 'Marcel', name: 'Marcel Gomez Damico'}
    ];
    if (!SidecDomains.initialized) {
      var codedValues;
      esriLoader.loadModules(
        ["esri/request",
          "dojo/domReady!"]
      ).then(
        ([esriRequest]) => {
          esriRequest("http://noteimg423.img.local/arcgis/rest/services/DESENV/SIDEC/FeatureServer/queryDomains", {
            //esriRequest("http://p110civitas.img.com.br/arcgis/rest/services/SIDEC/SIDEC/FeatureServer/queryDomains", {
            responseType: "json",
            method: "post",
            query: {
              f: 'json',
              layers: "[1, 0]"
            },
          }).then((response) => {

            // The requested data
            var domains = response.data.domains;
            domains.forEach(domain => {
              codedValues = domain.codedValues

              //console.log(domain.name);
              this.subject.next('Loading ' + domain.name);

              switch (domain.name) {
                case 'DC_COBRADE':
                  SidecDomains.DC_COBRADE = codedValues;
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
          }).then(() => {
            SidecDomains.initialized = true;
            //console.log('Domains OK!');
            this.subject.complete();
          });

        });
    }
    return this.subject;
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