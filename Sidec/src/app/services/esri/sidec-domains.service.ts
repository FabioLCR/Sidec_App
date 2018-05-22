import { Injectable } from '@angular/core';
import esriLoader from 'esri-loader';
import { debug } from 'util';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

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
      { code: 'dbo', name: 'Administrador' },
      { code: 'sis_pub', name: 'Usuário Anônimo' },
      { code: 'edulomelino', name: 'Luiz Eduardo de F. Lomelino' },
      { code: 'sidec@wellington', name: 'Wellington Queiroz de Farias' },
      { code: 'sidec@jaqueline', name: 'Jaqueline Costa da Silva' },
      { code: 'sidec@romano', name: 'Marcio Romano Corrê Custodio' },
      { code: 'sidec@bianca', name: 'Bianca de Lima Neves' },
      { code: 'sidec@maria', name: 'Maria de Oliveira Silva' },
      { code: 'sidec@antonio', name: 'Antonio José Alves Pereia' },
      { code: 'sidec@miranda', name: 'Paulo Cezar Teixeira de Miranda' },
      { code: 'sidec@dean', name: 'Dean Pereira de Melo' },
      { code: 'sidec@carlos', name: 'Carlos Eduardo Pereira Pacheco' },
      { code: 'sidec@alexandre', name: 'Alexandre da Silva' },
      { code: 'sergio', name: 'João Sergio da Silva Pires' },
      { code: 'antonio', name: 'Antonio José Alves Pereira' },
      { code: 'sidec@sergio', name: 'João Sergio da Silva Pires' },
      { code: 'joãosergio', name: 'João Sergio da Silva Pires' },
      { code: 'emergencia', name: 'Secretaria de Urbanismo' },
      { code: 'adilson', name: 'Adilson Alves de Souza' },
      { code: 'vanessa', name: 'Vanessa Dezerto' },
      { code: 'felipe', name: 'Magno Kelly Felipe' },
      { code: 'baldez', name: 'Elmer Hendrich Lousada Baldez' },
      { code: 'walace', name: 'Walace Medeiros Barbosa' },
      { code: 'igor', name: 'Igor Vigilio dos Santos Chagas' },
      { code: 'polycarpo', name: 'Bruno Polycarpo Palmerim Dias' },
      { code: 'arthur', name: 'Arthur Pereira Santos' },
      { code: 'mcerqueda', name: 'Marcelle Lemos Amorim de Cerqueda' },
      { code: 'mbdias', name: 'Marcely Borret Dias' },
      { code: 'layza', name: 'Layza Cristina Franco Pires' },
      { code: 'Juliana@sidec', name: 'Juliana Santos' },
      { code: 'juliana', name: 'Juliana Soares dos Santos' },
      { code: 'luana', name: 'Luana Ferreira Correia' },
      { code: 'lucas', name: 'Lucas Bastos de Oliveira' },
      { code: 'gatinho', name: 'Felipe Moreira Gatinho' },
      { code: 'karine', name: 'Karine Faria Reis' },
      { code: 'eric', name: 'Eric Almeida de Oliveira' },
      { code: 'anacristina', name: 'Ana Cristina Meirelles Quintanilha' },
      { code: 'thais', name: 'Thais Santos Silva' },
      { code: 'anselmo', name: 'Anselmo A Silva' },
      { code: 'Neli', name: 'Nelimara Lima' },
      { code: 'enzo@sidec', name: 'Enzo Delarezi' },
      { code: 'carolina@sidec', name: 'Ana Carolina Rosa Reis' },
      { code: 'Renata', name: 'Renata da Silva Teixeira' },
      { code: 'paularalves', name: 'Ana Paula Alves' },
      { code: 'Leticia', name: 'Letícia Oliveira' },
      { code: 'brunolc', name: 'Bruno Lopes Costa' },
      { code: 'Leandrosm', name: 'Leandro da Silva Marins' },
      { code: 'Paulor', name: 'Paulo Ribeiro' },
      { code: 'sturms', name: 'Einars Sturms' },
      { code: 'joelza', name: 'Joelza do Nascimento Teixeira' },
      { code: 'maia', name: 'Antônio Carlos de Souza Maia' },
      { code: 'cayo', name: 'Cayo Fernando Lauria de Rezende' },
      { code: 'vale', name: 'Thais Marcello Pereira Vale' },
      { code: 'marcelo barros', name: 'Marcelo Tadeu Barros da Fonseca' },
      { code: 'Luan', name: 'Luan Carvalho Leal' },
      { code: 'Diogo', name: 'Diogo da Rocha Vargas' },
      { code: 'Allan', name: 'Allan Wilis Pereira Sturms' },
      { code: 'Valeria', name: 'Valeria Suvobida de Carvalho Souza' },
      { code: 'Luize', name: 'Luize de Oliveira Ferraro Mello' },
      { code: 'Luciana', name: 'Luciana Sant`ana Cardoso de Araújo' },
      { code: 'Edivania', name: 'Edivania Pinheiro Andrade' },
      { code: 'allanreis', name: 'Allan Sant`anna Reis' },
      { code: 'anapaula', name: 'Ana Paula Ribeiro Alves' },
      { code: 'jair', name: 'Jair José Pereira Ribeiro' },
      { code: 'michel', name: 'Michel Camacho Cipolatti' },
      { code: 'monique', name: 'Monique Clemente' },
      { code: 'UFF', name: 'Estagiário UFF' },
      { code: 'erick', name: 'Erick Ferreira Franco' },
      { code: 'limenzo', name: 'Marcelo Henrique Silva de Miranda Limenzo' },
      { code: 'costa', name: 'Wagner de Assis Costa' },
      { code: 'sampaio', name: 'Felipe Gomes Sampaio' },
      { code: 'ferreira', name: 'Luiz Guilherme Ferreira dos Santos Junior' },
      { code: 'bcalvano', name: 'Bruno Calvano de Freitas' },
      { code: 'thainara', name: 'Thainara Sousa Martins' },
      { code: 'estevao', name: 'Estevão Pereira Escudeiro' },
      { code: 'naura', name: 'Naura Fernanda Monteiro da Silva' },
      { code: 'nathalia', name: 'Nathalia da Silva Henrique de Moura' },
      { code: 'hermsdorff', name: 'Juliana Hermsdorff Vellozo' },
      { code: 'anaclaudia', name: 'Ana Claudia Morais Ferreira' },
      { code: 'alexandre', name: 'Alexandre Perez Menezes de Castro' },
      { code: 'rodrigo', name: 'Rodrigo da Silva Gabriel' },
      { code: 'josue', name: 'Josué Antonio da Silva' },
      { code: 'rapozo', name: 'Ronaldo Fonseca Rapozo junior' },
      { code: 'Bruna', name: 'Bruna Patricio da Costa' },
      { code: 'josiane', name: 'Josiane de Oliveira' },
      { code: 'bruno@sidec', name: 'Bruno Calvano de Freitas' },
      { code: 'allansturms', name: 'Allan Wilis Pereira Sturms' },
      { code: 'sidney', name: 'Sidney Pereira Bermudo' },
      { code: 'thales', name: 'Thales da Silva Menezes' },
      { code: 'rafael', name: 'Rafael Souza Santos' },
      { code: 'victor', name: 'Victor Queiroz de Almeida' },
      { code: 'renato', name: 'Renato Gonzaga dos Santos' },
      { code: 'victoria', name: 'Victoria Alves de Oliveira' },
      { code: 'marana', name: 'Marana Cristina de Ascenção Almeida' },
      { code: 'karolina', name: 'Karolina Gameiro Cota Dias' },
      { code: 'leduardo', name: 'Luis Eduardo Magalhães Santelli Maia' },
      { code: 'soares', name: 'Sergio Fernando Soares' },
      { code: 'ewerton', name: 'Ewerton Ferreira Franco' },
      { code: 'deyve', name: 'Deyve Freitas Barreto' },
      { code: 'aldighieri', name: 'Ana Carolina Aldighieri' },
      { code: 'dayanne', name: 'Dayanne Arouche Furtado' },
      { code: 'caroline', name: 'Caroline da Silva de Araújo Leitão' }
    ].sort(function(a,b) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);} );
    if (!SidecDomains.initialized) {
      var codedValues;
      esriLoader.loadModules(
        ["esri/request",
          "dojo/domReady!"]
      ).then(
        ([esriRequest]) => {
            esriRequest(environment.esri_request, {
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