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
      {code: 'erick', name: 'Erick Ferreira Franco'},
      {code: 'limenzo', name: 'Marcelo Henrique Silva de Miranda Limenzo'},
      {code: 'costa', name: 'Wagner de Assis Costa'},
      {code: 'sampaio', name: 'Felipe Gomes Sampaio'},
      {code: 'ferreira', name: 'Luiz Guilherme Ferreira dos Santos Junior'},
      {code: 'bcalvano', name: 'Bruno Calvano de Freitas'},
      {code: 'thainara', name: 'Thainara Sousa Martins'},
      {code: 'estevao', name: 'Estevão Pereira Escudeiro'},
      {code: 'naura', name: 'Naura Fernanda Monteiro da Silva'},
      {code: 'nathalia', name: 'Nathalia da Silva Henrique de Moura'},
      {code: 'hermsdorff', name: 'Juliana Hermsdorff Vellozo'},
      {code: 'anaclaudia', name: 'Ana Claudia Morais Ferreira'},
      {code: 'alexandre', name: 'Alexandre Perez Menezes de Castro'},
      {code: 'rodrigo', name: 'Rodrigo da Silva Gabriel'},
      {code: 'josue', name: 'Josué Antonio da Silva'},
      {code: 'rapozo', name: 'Ronaldo Fonseca Rapozo junior'},
      {code: 'Bruna', name: 'Bruna Patricio da Costa'},
      {code: 'josiane', name: 'Josiane de Oliveira'},
      {code: 'bruno@sidec', name: 'Bruno Calvano de Freitas'},
      {code: 'allansturms', name: 'Allan Wilis Pereira Sturms'},
      {code: 'sidney', name: 'Sidney Pereira Bermudo'},
      {code: 'thales', name: 'Thales da Silva Menezes'},
      {code: 'rafael', name: 'Rafael Souza Santos'},
      {code: 'victor', name: 'Victor Queiroz de Almeida'},
      {code: 'renato', name: 'Renato Gonzaga dos Santos'},
      {code: 'victoria', name: 'Victoria Alves de Oliveira'},
      {code: 'marana', name: 'Marana Cristina de Ascenção Almeida'},
      {code: 'karolina', name: 'Karolina Gameiro Cota Dias'},
      {code: 'leduardo', name: 'Luis Eduardo Magalhães Santelli Maia'},
      {code: 'soares', name: 'Sergio Fernando Soares'},
      {code: 'ewerton', name: 'Ewerton Ferreira Franco'},
      {code: 'deyve', name: 'Deyve Freitas Barreto'},
      {code: 'aldighieri', name: 'Ana Carolina Aldighieri'},
      {code: 'dayanne', name: 'Dayanne Arouche Furtado'},
      {code: 'caroline', name: 'Caroline da Silva de Araújo Leitão'}
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